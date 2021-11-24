/*
Treehouse FSJS Techdegree:
* Project 2 - Data Pagination and Filtering
*/

// declare the number of items to show per page
const itemPerPage = 9;

/* This function will create and insert/append 
the elements needed to display the students */
function showPage(list, page) {
   
   // these will represent the index for the first and last student on the page
   const startIndex = (page * itemPerPage) - itemPerPage;
   const endIndex = page * itemPerPage;

   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
 
   for ( let i = 0; i < list.length; i++ ) {
      let students = list[i];
      if ( i >= startIndex && i < endIndex ) {
         // create the elements needed to display the student information
         let studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${students.picture.large}" alt="Profile Picture">
                  <h3>${students.name.first} ${students.name.last}</h3>
                  <span class="email">${students.email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${students.registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML('afterbegin', studentItem);
      }
   }
 }


/* This function will create and insert/append 
the elements needed for the pagination buttons */
function addPagination(list) {
   
   // calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / itemPerPage);
   
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
 
   for ( let i = 1; i <= numOfPages; i++ ) {
      let button = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }

   // give the first pagination button a class of "active"
   const firstButton = document.querySelector('.link-list button');
   firstButton.className = "active";

   /* an event listener that will remove the "active" class from the previous button
   and add the "active" class to the clicked button  */ 
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const button = e.target;
         const buttonNumber = button.textContent;
         const activeButton = document.querySelector('.active');
         activeButton.removeAttribute('class');
         button.className = 'active';
         showPage(list,buttonNumber); // displays the next set of items from the array
      }
   });
 }


showPage(data, 1); // displays the initial set of students on the first page
addPagination(data); // displays the set of students in the succeeding pages