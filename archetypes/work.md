---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
weight: 10
medium: "Oil on canvas"
year: {{ now.Year }}
dimensions: ""        # e.g. "120 × 90 cm"
price: ""             # e.g. "$2,400" or "POA"; blank = hidden
availability: "available"   # available | sold | nfs
alt: ""               # descriptive alt text for the image
draft: false
---

Optional longer description of the work, in Markdown. Shown on the artwork's
detail page.
