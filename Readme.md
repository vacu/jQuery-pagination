## Options
### itemsPerPage
Number of items that should be on the page
### items
The item (as the html element of css selector)
### navigationContainer
The element that should contain the HTML for navigation
### currentPage
Hidden input element css selector
### showPerPage
Hidden input element css selector

## Usage

  <script type="text/javascript" src="/js/libs/jquery.js"></script>
  <script type="text/javascript" src="/js/pagination.js"></script>

  <script type="text/javascript">
    $(document).ready(function() {
      $('#container').pagination({
        itemsPerPage: 2,
        navigationContainer: '.navigationContainer',
        currentPage: '#currentPage',
        showPerPage: '#showPerPage'
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