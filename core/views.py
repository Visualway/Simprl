from django.shortcuts import render, redirect, get_object_or_404
from .models import URL
# Create your views here.
def home(request):
    if request.method == "POST":
        long_url = request.POST.get('shorten', '')
        if long_url == "":
            pass
        else:
            hashed_url = URL(long_url=long_url)
            hashed_url.save()
            compiled_url = f"{request.build_absolute_uri()}{hashed_url.hash}"
            return render(request, 'home.html', {'url': compiled_url, 'long_url': hashed_url})
    return render(request, 'home.html')

def redirect_to_url(request, hash):
    url = get_object_or_404(URL, hash=hash)
    return redirect(url.long_url)