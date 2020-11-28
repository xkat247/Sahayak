
$(document).ready(function () {
  $('.apply').click(function() {
    
      $.ajax({
          url: '/apply',
          type: 'POST',
          data: {
            job:job._id,
            user:user._id
          },
          success: function(msg) {
              alert('Applied');
          }
      });
  });
});
