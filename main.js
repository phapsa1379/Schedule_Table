//Global Variable Element
let content="";
let table=document.querySelector('table');
let saveBtn=document.querySelector('.save-btn');
let clearBtn=document.querySelector('.clear-btn');
let backupBtn=document.querySelector('.backup-btn');
let exportBtn=document.querySelector('.export-btn');
let guideBtn=document.querySelector('.guide-btn');
let closeBtnModal=document.querySelector('.close-btn-modal-icon');
let modalContainer=document.querySelector('.modal-container');
let dark=document.querySelector('.dark');


//Global Objects
let backupValues={};
let backupChecks={};
let values= {};
let checks={};


//Creat Primary Table
for(let i=1;i<=24;i++) {
    let j = (i + 5) % 24;
    content += ` <tr class="tr-${i}">
     <td class="tds td-${i}-1 hour">00 : ${j} </td>
     <td class="tds td-${i}-2"><textarea class="aria aria-${i}-2" readonly></textarea><div class="not-done-btn ndone"><i class="fas fa-times"></i></div><div class="done-btn ydone"><i class="fas fa-check"></i></div></td>
     <td class="tds td-${i}-3"><textarea class="aria aria-${i}-3" readonly></textarea><div class="not-done-btn ndone"><i class="fas fa-times"></i></div><div class="done-btn ydone"><i class="fas fa-check"></i></div></td>
     <td class="tds td-${i}-4"><textarea class="aria aria-${i}-4" readonly></textarea><div class="not-done-btn ndone"><i class="fas fa-times"></i></div><div class="done-btn ydone"><i class="fas fa-check"></i></div></td>
     <td class="tds td-${i}-5"><textarea class="aria aria-${i}-5" readonly></textarea><div class="not-done-btn ndone"><i class="fas fa-times"></i></div><div class="done-btn ydone"><i class="fas fa-check"></i></div></td>
     <td class="tds td-${i}-6"><textarea class="aria aria-${i}-6" readonly></textarea><div class="not-done-btn ndone"><i class="fas fa-times"></i></div><div class="done-btn ydone"><i class="fas fa-check"></i></div></td>
     <td class="tds td-${i}-7"><textarea class="aria aria-${i}-7" readonly></textarea><div class="not-done-btn ndone"><i class="fas fa-times"></i></div><div class="done-btn ydone"><i class="fas fa-check"></i></div></td>
     <td class="tds td-${i}-8"><textarea class="aria aria-${i}-8" readonly></textarea><div class="not-done-btn ndone"><i class="fas fa-times"></i></div><div class="done-btn ydone"><i class="fas fa-check"></i></div></td>
     </tr>`
}


//Add Primary Table to the Html file
table.innerHTML+=content;



//Load Information
loadData();


//Other Global Variable Element
let doneBtn=document.querySelector('.done-btn');
let notDoneBtn=document.querySelector('.not-done-btn');




//Change each Cell from readonly to read and write
table.addEventListener('dblclick',(e)=>
{
    e.target.removeAttribute('readonly');
})

//Load function
function loadData()
{
    values=JSON.parse(localStorage.getItem('ariaValues'));
    checks=JSON.parse(localStorage.getItem('checkValues'));
    if(!values)
        values={};
    if(!checks)
        checks={};

    let color,bgColor,el;
    for(let i=1;i<=24;i++)
    {
        for(let j=2;j<=8;j++)
        {
            let key=i+"-"+j;
            let className="aria-"+i+"-"+j;
            el= document.querySelector('.'+className);//textAria
            if(values[key])
            {
               el.value=values[key];
            }
            else
            {
               el.value="";
            }

            color="#000";bgColor="#fff";

                switch (checks[key]) {
                    case 0: color="#000";bgColor="#fff"; break;
                    case -1: color="#fff";bgColor="#f53b57";el.classList.add('red');break;
                    case 1: color="#fff";bgColor="#20bf6b";el.classList.add('green');break;

                }
                console.log(bgColor);
                el.style.color=color;
                el.style.backgroundColor=bgColor;
                el.parentElement.style.backgroundColor=bgColor;


        }
    }
}



//Event Listeners :

//Save All Data
saveBtn.addEventListener('click',(e)=>
{
    document.querySelectorAll('textarea').forEach((item)=>
    {
        item.readOnly=true;
        let classList=item.getAttribute('class').split(' ');
        let trIndex=classList[1].split('-')[1];
        let tdIndex=classList[1].split('-')[2];
        let key=trIndex+"-"+tdIndex;
        values[key]=item.value;
        let checkAmount;
        if(item.getAttribute('class').includes('green'))
        {
            checkAmount=1;
        }
        else if(item.getAttribute('class').includes('red'))
        {
            checkAmount=-1;
        }
        else//white
        {
            checkAmount=0;
        }


        checks[key]=checkAmount;


    })
    console.log(checks);
    localStorage.setItem('ariaValues',JSON.stringify(values));
    localStorage.setItem('checkValues',JSON.stringify(checks))


})

//Remove All Data
clearBtn.addEventListener('click',(e)=>
{
    if(JSON.stringify(values)!=="{}")
    {

        backupValues=JSON.parse(JSON.stringify(values));
        backupChecks=JSON.parse(JSON.stringify(checks));

        document.querySelectorAll('textarea').forEach((item)=>
        {
            item.value='';
            item.style.backgroundColor="#fff";
            item.parentElement.style.backgroundColor="#fff";
            item.style.color="#000";
            item.classList.remove('green');
            item.classList.remove('red');

        })
        values={};
        localStorage.setItem('ariaValues',JSON.stringify(values));
        checks={};
        localStorage.setItem('checkValues',JSON.stringify(checks));
    }

})

//Recover Removed Information
backupBtn.addEventListener('click',(e)=>
{
    // console.log(backupValues);
    values=JSON.parse(JSON.stringify(backupValues));
    localStorage.setItem('ariaValues',JSON.stringify(values));
    checks=JSON.parse(JSON.stringify(backupChecks));
    localStorage.setItem('checkValues',JSON.stringify(checks));
    loadData();

})


//Set Color to green if done else red
document.documentElement.addEventListener('click',(e)=>
{
    let tdEl,ariaEl;

    if(e.target.getAttribute('class'))
    {
        if(e.target.getAttribute('class').includes('fas'))
        {
            tdEl=e.target.parentElement.parentElement;
            ariaEl=tdEl.firstChild;
            if(ariaEl.value)
            {

                if(e.target.getAttribute('class').includes('fa-times'))
                {

                    ariaEl.style.color="#fff";
                    ariaEl.style.backgroundColor="#f53b57";
                    tdEl.style.backgroundColor="#f53b57";
                    ariaEl.classList.add('red');
                    ariaEl.classList.remove('white');
                    ariaEl.classList.remove('green');
                }
                if(e.target.getAttribute('class').includes('fa-check'))
                {

                    ariaEl.style.color="#fff";
                    ariaEl.style.backgroundColor="#20bf6b";
                    tdEl.style.backgroundColor="#20bf6b";
                    ariaEl.classList.add('green');
                    ariaEl.classList.remove('white');
                    ariaEl.classList.remove('red');

                }
            }
        }
        else
        {
            tdEl=e.target.parentElement;
            ariaEl=tdEl.firstChild;

            if(ariaEl.value)
            {
                if(e.target.getAttribute('class').includes('ndone'))
                {

                    ariaEl.style.color="#fff";
                    ariaEl.style.backgroundColor="#f53b57";
                    tdEl.style.backgroundColor="#f53b57";
                    ariaEl.classList.add('red');
                    ariaEl.classList.remove('white');
                    ariaEl.classList.remove('green');
                }
                if(e.target.getAttribute('class').includes('ydone'))
                {

                    ariaEl.style.color="#fff";
                    ariaEl.style.backgroundColor="#20bf6b";
                    tdEl.style.backgroundColor="#20bf6b";
                    ariaEl.classList.add('green');
                    ariaEl.classList.remove('white');
                    ariaEl.classList.remove('red');

                }
            }
        }
    }




})


//PDF Export

exportBtn.addEventListener('click',(e)=>
{
    let doc = new jsPDF();
    let body=document.querySelector('body');
    let specialElementHandlers = {
        '.export-btn': function (element, renderer) {
            return true;
        }
    };
    doc.fromHTML(body, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });

// Save the PDF
    doc.save('pgs.pdf');
})

//Show hint and guide
guideBtn.addEventListener('click',(e)=>
{
modalContainer.style.display='block';

dark.style.display='block';
})


//Close Modal by click close
closeBtnModal.addEventListener('click',(e)=>
{
    modalContainer.style.display='none';
    dark.style.display='none';

})

//Close Modal by click out of Modal
dark.addEventListener('click',(e)=>
{
    closeBtnModal.click();
})