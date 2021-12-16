from django.db import models
import string
import random


def randomize():
    """
    Return a Random String Generated as Hash
    """
    N = 15
    s = string.ascii_uppercase + string.ascii_lowercase + string.digits
    # generate a random string of length 15
    url_id = ''.join(random.choices(s, k=N))
    return url_id


class URL(models.Model):
    """
    Simple URL model"""
    hash = models.CharField(max_length=15, null=True, blank=True)
    long_url = models.URLField()

    def __str__(self):
        """
        UNICODE representation of the model
        """
        return f"{self.hash}"

    def save(self, *args, **kwargs):
        """
        Overiding the Django default save method
        """
        self.hash = randomize()
        super().save(*args, **kwargs)
