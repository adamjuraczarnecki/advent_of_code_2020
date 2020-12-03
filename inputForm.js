fetch('input.txt')
   .then( r => r.text() )
   .then( t => document.querySelector('textarea').value = t )
   
  document.querySelector('section a').addEventListener('click', formToggle, true)
  document.querySelector('button').addEventListener('click', function(){
	job(document.querySelector('textarea').value.split(/\r?\n/))
  })
   
   function formToggle(e){
		const form = e.target.parentNode.nextElementSibling;
		e.target.classList.toggle("active");
		if (form.style.display === 'none') {
			form.style.display = 'block'

		} else {
			form.style.display = 'none';
		}
   }