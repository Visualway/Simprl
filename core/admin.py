from django.contrib import admin
from .models import URL
# Register your models here.


class URLAdmin(admin.ModelAdmin):
    list_display = ['long_url', 'hash']


admin.site.register(URL, URLAdmin)
