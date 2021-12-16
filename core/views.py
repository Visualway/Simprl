from django.shortcuts import render, redirect, get_object_or_404

from .models import URL


def home(request):
    """
    Home view to show the homepage
    """
    return render(request, 'core/home.html')


def redirect_to_url(request, hash):
    """
    Redirect to long url by hashed URL
    """
    url = get_object_or_404(URL, hash=hash)
    return redirect(url.long_url)
