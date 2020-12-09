fetch('input.txt')
   .then( r => r.text() )
   .then( t => document.querySelector('textarea').value = t )
   
  document.querySelector('section a').addEventListener('click', formToggle, true)
  document.querySelector('button').addEventListener('click', function(){
	if (document.body.contains(document.querySelector('select'))){
		job(document.querySelector('textarea').value.split(/\r?\n/), parseInt(document.querySelector('select').value))
	} else{
		job(document.querySelector('textarea').value.split(/\r?\n/))
	}
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