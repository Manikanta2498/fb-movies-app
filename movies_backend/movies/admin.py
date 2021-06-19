from django.contrib import admin

# Register your models here.
from .models import Lname,Fname,Dynamic,Movie,User

myModels = [Dynamic]
admin.site.register(myModels)

class FnameAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'race','gender')
admin.site.register(Fname, FnameAdmin)

class LnameAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'race')
admin.site.register(Lname, LnameAdmin)

class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'rating','link')
admin.site.register(Movie, MovieAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'user_race','user_gender', 'user_age')
admin.site.register(User, UserAdmin)