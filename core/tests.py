from django.test import TestCase
from .models import URL

# Create your tests here.
class URLTestCase(TestCase):
    def setUp(self):
        URL.objects.create(long_url="https://python.org")

    def test_url_id(self):
        python_site = URL.objects.get(long_url="https://python.org")
        self.assertEqual(str(python_site), python_site.hash)