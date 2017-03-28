// $('#delete').on('click', function(e){
//   e.preventDefault();

//   $('input:checked').each(function(index, value){
//     var val = $(this).attr('id');
//     console.log($(this));
//     var $thisInput = $(this);

//     $.ajax({
//       url:'/components/'+val,
//       type:'DELETE'
//     }).done(function(){
//       $thisInput.parents('tr').remove();
//     });

//   });
// });

function getSearch() {
  localStorage.setItem("search", document.getElementById('search').value);
}
  
if (window.location.pathname === '/components') {
  if (localStorage.getItem("search") === 'null'||localStorage.getItem("search") === null||localStorage.getItem("search").indexOf(' ') >=0) {
    fetch('api/v1/component?sort=createdate').then(function(res) {
      res.json().then(function(components) {
        console.log('components', components);
        var tbody = document.getElementById('table-body');
        components.forEach(function(component) {
          tbody.insertAdjacentHTML('beforeend', '<li><a class="panel-block is-active" href="/components/' + component._id + '">' + component.comp_name + '<span class="panel-icon"><i class="fa fa-book"</span></a></li>');
        });
      })
    });

    fetch('api/v1/component/count').then(function(res) {
      res.json().then(function(components) { 
        console.log('components', components);
        var count = document.getElementById('count');
          count.insertAdjacentHTML('beforeend', '<h1>Total Number of Components: '+components.count+'</h1>');
      
      })
    });
  }
  else{
    fetch('api/v1/component?query={"comp_name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
      res.json().then(function(components){
        if (components.length === 0) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>No results found.</h1>');
        }
        else if (components.length === 1) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found ' + components.length + ' component.</h1>');
        }
        else {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found '+components.length+' components.</h1>');
        }
        var tbody = document.getElementById('table-body');
        components.forEach(function(component) {
          tbody.insertAdjacentHTML('beforeend', '<li><a class="panel-block is-active" href="/components/' + component._id + '">' + component.comp_name + '<span class="panel-icon"><i class="fa fa-book"</span></a></li>');
        });
        
      });
    });
    localStorage.setItem("search", null);
  }

}



