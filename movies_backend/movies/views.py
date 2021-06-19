from django.http import HttpResponse
from django.http import response
from django.http.response import JsonResponse
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view

from movies.models import Dynamic, Fname, Lname, Movie, User
import json
import ast
import random
import string

def index(request):
    return HttpResponse("Hello, world. You're at the Movies index.")

@api_view(["GET"])
def getUserID(request):
    r = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])
    if len(User.objects.all()) > 0:
        while (len(User.objects.get(user_id=r)) != 0):
            r = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])
    return JsonResponse(r,safe=False)

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