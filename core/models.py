from django.db import models
import string, random 

def randomize():
    """
    Return a Random String Generated as Hash"""
    N = 15
    s = string.ascii_uppercase + string.ascii_lowercase + string.digits
    # generate a random string of length 15
    url_id = ''.join(random.choices(s, k=N))
    return url_id

# Create your models here.
class URL(models.Model):
    hash = models.CharField(max_length=15, null=True, blank=True)
    long_url = models.URLField()

    def __str__(self):
        return f"{self.hash}"
    
    def save(self, *args, **kwargs):
        self.hash = randomize()
        super().save(self, *args, **kwargs) 