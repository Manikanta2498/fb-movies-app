from django.db import models

class Dynamic(models.Model):
    compensation = models.CharField(max_length=10)
    instructions = models.TextField()
    preconnect1 = models.TextField()
    preconnect2 = models.TextField()
    thankyou_code = models.CharField(max_length=20)
    survey_time = models.IntegerField(null=True)
    survey_time_2 = models.IntegerField(null=True)
    movies_select_count = models.IntegerField(null=True)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    review = models.TextField()
    link = models.CharField(max_length=100)
    rating = models.CharField(max_length=2)
    image_url = models.CharField(max_length=200)

class Fname(models.Model):
    first_name = models.CharField(max_length=200)
    race = models.CharField(max_length=200)
    gender = models.CharField(max_length=6)

class Lname(models.Model):
    last_name = models.CharField(max_length=200)
    race = models.CharField(max_length=200)

class User(models.Model):
    user_id = models.CharField(max_length=10)
    user_race = models.CharField(max_length=200)
    user_gender = models.CharField(max_length=6)
    user_age = models.IntegerField()
    user_education = models.CharField(max_length=200)
    user_frequency = models.CharField(max_length=200)
    user_genre = models.CharField(max_length=200)
    user_race = models.CharField(max_length=200)
    test_type = models.IntegerField(null=True)
    user_entry_time = models.DateTimeField()
    time_spent = models.CharField(max_length=200,null=True)
    feedback_rate = models.IntegerField(null=True)
    feedback_satisfied = models.IntegerField(null=True)
    feedback_rely = models.IntegerField(null=True)
    feedback_likely = models.IntegerField(null=True)
    feedback_study = models.TextField(null=True)
    feedback_share = models.TextField(null=True)
    movie_link_clicked = models.IntegerField(default=0)

class Output(models.Model):
    user_id = models.CharField(max_length=10)
    order_no = models.IntegerField()
    movie_title = models.CharField(max_length=200)
    rating = models.IntegerField()
    review = models.TextField()
    clicked = models.IntegerField()
    timed = models.IntegerField()
    rec_first_name = models.CharField(max_length=200)
    rec_last_name = models.CharField(max_length=200)
    rec_race = models.CharField(max_length=200)
    rec_gender = models.CharField(max_length=6)
    timestamp = models.DateTimeField()
    readmore_count = models.IntegerField()

class UserPattern(models.Model):
    user_id = models.CharField(max_length=10)
    user_movies_pattern = models.CharField(max_length=5000)
    user_names_pattern = models.CharField(max_length=5000)  
    movie_index = models.IntegerField()  
    names_index = models.IntegerField()

