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
<script type="text/javascript" src="/js/libs/jquery.js"></script>
<script type="text/javascript" src="/js/pagination.js"></script>

<script type="text/javascript">
  $(document).ready(function() {
    $('#container').pagination({
      itemsPerPage: 2,
      navigationItem: '',
      navigationContainer: '.navigationContainer',
      currentPage: '#currentPage',
      showPerPage: '#showPerPage'
      nextPage: '',
      prevPage: '',
      images: <?php echo json_encode($theImages) ?>,
      showPages: false,
      imgWidth: '50',
      imgHeight: '50'
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

<div class="navigationContainer"></div>
```