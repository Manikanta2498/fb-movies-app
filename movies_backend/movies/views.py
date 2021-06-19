from django.http import HttpResponse
from django.http import response
from django.http.response import JsonResponse
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view

from movies.models import Dynamic, Fname, Lname, Movie, Output, User
import dateutil.parser 
import json
import ast
import random
import string

IPs = []

def index(request):
    return HttpResponse("Hello, world. You're at the Movies index.")

@api_view(["POST"])
def postIP(data):
    data = data.body.decode("utf-8")
    if data in IPs:
        return JsonResponse(0,safe=False)
    else:
        return JsonResponse(1,safe=False)

@api_view(["GET"])
def getUserID(request):
    r = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])
    if len(User.objects.all()) > 0:
        while (len(User.objects.filter(user_id=r)) != 0):
            r = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])
    return JsonResponse(r,safe=False)

@api_view(["POST"])
def postSurveyData(data):
    data = json.loads(data.body.decode("utf-8"))
    try:
        movies_selected = []
        for movie in data['movies_selected']:
            if data['movies_selected'].get(movie):
                movies_selected.append(movie)
        movies_reviewed = data['movies_reviewed']
        for i in range(len(data['movie_data'])-1,-1,-1):
            movie_data = data['movie_data'][i]
            name_data = data['name_data'][i]
            fname = Fname.objects.filter(first_name=name_data['fname'])[0]
            clicked = 1 if str(i) in movies_selected else 0
            readmore_count = movies_reviewed.get(str(i)) if movies_reviewed.get(str(i)) else 0
            timed = 1 if data["time_choice"] == True else 0
            output_instance = Output.objects.create(
                user_id = data["user_id"],
                order_no = i+1,
                movie_title = movie_data["title"],
                rating = movie_data["rating"],
                review = movie_data["review"],
                clicked = clicked,
                readmore_count = readmore_count,
                timestamp = data["timestamp"],
                timed = timed,
                rec_first_name = fname.first_name,
                rec_last_name = name_data['lname'],
                rec_race = fname.race,
                rec_gender = fname.gender,
            )
            user = User.objects.get(user_id=data["user_id"])
            user.test_type = timed
            user.save()
        return JsonResponse('Post Info Success',safe=False)
    except Exception as e:
        print(e)
        return JsonResponse('Post Info Failed',safe=False)

@api_view(["POST"])
def postFeedbackData(data):
    data = json.loads(data.body.decode("utf-8"))
    try:
        user_id = data["user_id"]
        user = User.objects.get(user_id=user_id)
        user.feedback_rate = data["rate"]
        user.feedback_satisfied = data["satisfied"]
        user.feedback_rely = data["rely"]
        user.feedback_likely = data["likely"]
        user.feedback_study = data["study"]
        user.feedback_share = data["share"]
        user.time_spent = str((dateutil.parser.parse(data["user_exit_time"])-user.user_entry_time).total_seconds())
        user.save()
        return JsonResponse('Post Feedback Success',safe=False)
    except Exception as e:
        print(e)
        return JsonResponse('Post Feedback Failed',safe=False)

@api_view(["POST"])
def postMovieLink(data):
    data = json.loads(data.body.decode("utf-8"))
    try:
        user_id = data["user_id"]
        user = User.objects.get(user_id=user_id)
        user.movie_link_clicked = 1
        user.save()
        return JsonResponse('Post Movie Link Success',safe=False)
    except Exception as e:
        print(e)
        return JsonResponse('Post Movie Link Failed',safe=False)

@api_view(["POST"])
def postUserInfo(data):
    info = json.loads(data.body.decode("utf-8"))
    races = ','.join(name for name in info['race'])
    try:
        user_instance = User.objects.create(
            user_id = info["user_id"],
            user_race = races,
            user_gender = info["gender"],
            user_age = info["age"],
            user_education = info["study"],
            user_frequency = info["frequency"],
            user_genre = info["genre"],
            user_entry_time = info["user_entry_time"],
        )
        return JsonResponse('Post Info Success',safe=False)
    except Exception as e:
        print(e)
        return JsonResponse('Post Info Failed',safe=False)

@api_view(["POST"])
def getNames(data):
    names = ast.literal_eval(data.body.decode("utf-8"))
    fnames = [model_to_dict(Fname.objects.get(id=fname_id)) for fname_id in names]
    res = []
    for fname in fnames:
        items = list(Lname.objects.filter(race=fname['race']))
        random_lname = model_to_dict(random.sample(items, 1)[0])
        res.append({'fname': fname['first_name'],'lname': random_lname['last_name']})
    return JsonResponse(res,safe=False)

@api_view(["POST"])
def getMovies(data):
    movies_indexes = ast.literal_eval(data.body.decode("utf-8"))
    movies = [model_to_dict(Movie.objects.get(id=movie_id)) for movie_id in movies_indexes]
    return JsonResponse(movies,safe=False)

@api_view(["GET"])
def getDynamics(request):
    return JsonResponse(model_to_dict(Dynamic.objects.first()),safe=False)

@api_view(["GET"])
def getMoviesCount(request):
    return JsonResponse(len(Movie.objects.all()),safe=False)

@api_view(["GET"])
def getFNamesCount(request):
    return JsonResponse(len(Fname.objects.all()),safe=False)

@api_view(["GET"])
def createFnames(request):
    try:
        with open('../DB_Data/fname.json') as f:
            data = json.load(f)
            for fname in data[2]['data']:
                fname_instance = Fname.objects.create(
                    first_name=fname['first_name'],
                    race=fname['race'],
                    gender=fname['gender'])
        return JsonResponse('First names created!',safe=False)
    except ValueError as e:
        print("----Error----")
        return response(e.args[0])

@api_view(["GET"])
def createLnames(request):
    try:
        with open('../DB_Data/lname.json') as f:
            data = json.load(f)
            for lname in data[2]['data']:
                fname_instance = Lname.objects.create(
                    last_name=lname['last_name'],
                    race=lname['race'])
        return JsonResponse('Last names created!',safe=False)
    except ValueError as e:
        print("----Error----")
        return response(e.args[0])

@api_view(["GET"])      
def createMovies(request):
    try:
        with open('../DB_Data/movies_1.json') as f:
            data = json.load(f)
            for movie in data[2]['data']:
                movie_instance = Movie.objects.create(
                    title=movie['title'],
                    review=movie['review'],
                    link=movie['link'],
                    rating=movie['rating'],
                    image_url=movie['image_link'],
                    )
        return JsonResponse('Movies created!',safe=False)
    except ValueError as e:
        print("----Error----")
        return response(e.args[0])