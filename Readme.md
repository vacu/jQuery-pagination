## Options
### itemsPerPage
Number of items that should be on the page
### items
The item (as the html element of css selector)
### navigationItem
The navigation item if you don't want the page numbers
### pagesContainer
CSS selector if you want to see the pages (ex: 1/12)
### showPages
If true the pagesContainer should be specified else no pages will be shown
### images
If given the page numbers will be replaces with these images
### imgWidth & imgHeight
Width and height for the "images" (above)
### navigationContainer
The element that should contain the HTML for navigation
### currentPage
Hidden input element css selector
### showPerPage
Hidden input element css selector

## Usage

```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-theme.min.css">
<script src="https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
<script src="../pagination.js"></script>

<script>
  $(document).ready(function() {
    $('#container').pagination({
      mode: 'bootstrap',
      itemsPerPage: 2,
      navigationItem: '',
      navigationContainer: '.navigationContainer',
      currentPage: '#currentPage',
      showPerPage: '#showPerPage',
      prevPage: '<li id="prev"><a href="javascript:;">&laquo;</a></li>',
      nextPage: '<li id="next"><a href="javascript:;">&raquo;</a></li>',
      showPages: false,
    });
  });
</script>

<input type="hidden" id="showPerPage" value="0" />
<input type="hidden" id="currentPage" value="0" />

<div id="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>

<ul class="pagination navigationContainer"></div>
```


MIT
