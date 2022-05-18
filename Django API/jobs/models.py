import datetime
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
STAGES = [('JOBAPPLIED', 'Job Applied'), ('HRCALL', 'HR call'),
          ('FSTINT', 'First Interview'),
          ('SNDINT', 'Second Interview'),
          ('TRDINT', 'Third Interview'),
          ('JOBOFFER', 'Job Offer'),
          ('DENIED', 'Denied')
          ]


class Job(models.Model):
    job_title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    url = models.URLField(null=True, blank=True)
    date_applied = models.DateField(
        ("Date Applied"), default=datetime.date.today)

    stage = models.CharField(max_length=10,
                             choices=STAGES, default='JOBAPPLIED')
    notes = models.TextField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.job_title

    class Meta:
        ordering = ['-date_applied']
