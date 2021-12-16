from django.http import JsonResponse
import json

from .models import URL


def create_url_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        long_url = data['long_url']
        if long_url == '':
            return JsonResponse({'success': False})
        else:
            hashed_url = URL.objects.get_or_create(long_url=long_url)[0]
            compiled_url = f"{request.build_absolute_uri().replace('api/v1/url/create/', '')}{hashed_url.hash}"
            return JsonResponse({'success': True, 'short_url': compiled_url, 'long_url': hashed_url.long_url})
    else:
        return JsonResponse({'success': False})
