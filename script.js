const sonder_store = document.querySelector(':root');
const sonder_1 = getComputedStyle(sonder_store).getPropertyValue('--font_r');

// create new Element //
function create_object(title, time){
    // create start_date //
    let d = new Date();
    let day = d.getDate();
    let month = d.toLocaleString('default', {month: 'short'});
    // create end_date //
    d.setDate(d.getDate() + parseInt(time.value));
    let end_day = d.getDate();
    let end_month = d.toLocaleString('default', {month: 'short'});
    // create title //
    const text_title = document.createTextNode(title.value);
    // create every brick //
    const container = document.createElement('div');
    const text = document.createElement('p');
    const progressbar = document.createElement('div');
    const bar = document.createElement('div');
    const bar_currently = document.createElement('span');
    const date_box = document.createElement('div');
    const start_date = document.createElement('p');
    const end_date = document.createElement('p');
    const date_line = document.createElement('p');
    const btn_del = document.createElement('div');
    const btn_logo = document.createElement('p');
    
    // create ID´s and LocalStorage //
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let store_1 = [];
    while(store_1.length != 23){store_1.push(alphabet[Math.floor(Math.random()*alphabet.length)]);};
    let id_1 = store_1.join('');
    window.localStorage.setItem(id_1, parseInt(time.value));
    window.localStorage.setItem(id_1 + '___time_setter_', parseInt(0));

    // set ID´s //
    bar.setAttribute('id', id_1);
    // create btn_logo text //
    btn_logo.appendChild(document.createTextNode('X'));
    // create progress in  text-form //
    bar_currently.appendChild(document.createTextNode('0%'));
    // create dates //
    start_date.appendChild(document.createTextNode(`Start: ${day}/${month}`));
    end_date.appendChild(document.createTextNode(`End: ${end_day}/${end_month}`));
    date_line.appendChild(document.createTextNode('|'));
    // assemble building blocks //
    text.appendChild(text_title);
    container.appendChild(text);
    container.appendChild(progressbar);
    progressbar.appendChild(bar);
    progressbar.appendChild(bar_currently);
    container.appendChild(date_box);
    date_box.appendChild(start_date);
    date_box.appendChild(date_line);
    date_box.appendChild(end_date);
    container.appendChild(btn_del);
    btn_del.appendChild(btn_logo);
    // main-container//
    container.style.width = '70%';
    container.style.backgroundColor = 'rgb(57, 64, 66)';
    container.style.marginBottom = '2em';
    container.style.padding = '30px';
    container.style.textAlign = 'center';
    container.style.marginLeft = '50%';
    container.style.transform = 'translate(-50%)';
    container.style.fontSize = '1.25em';
    container.style.fontWeight = '700';
    container.style.fontFamily = sonder_1;
    container.style.position = 'relative';
    // title from progress //
    text.style.fontFamily = sonder_1;
    // progressBar default //
    progressbar.style.width = '100%';
    progressbar.style.height = '40px';
    progressbar.style.backgroundColor = 'rgb(243, 243, 152)';
    progressbar.style.borderRadius = '5px';
    progressbar.style.overflow = 'hidden';
    progressbar.style.position = 'relative';
    // progressBar progress //
    bar.style.width = '0%';
    bar.style.height = '100%';
    bar.style.backgroundColor = 'rgb(113, 253, 253)';
    // progress in text-form //
    bar_currently.style.position = 'absolute';
    bar_currently.style.top = '50%';
    bar_currently.style.right = '5px';
    bar_currently.style.transform = 'translateY(-50%)';
    bar_currently.style.font = 'bold 1.25em "Quicksand", sans-serif';
    // date_box format //
    date_box.style.width = '100%';
    date_box.style.height = '30px';
    date_box.style.marginTop = '10px';
    date_box.style.display = 'flex';
    date_box.style.justifyContent = 'space-between';
    date_box.style.backgroundColor = 'black';
    date_box.style.color = 'white';
    date_box.style.fontSize = '0.5em';
    date_box.style.alignItems = 'center';
    date_box.style.borderRadius = '5px';
    // adjustments (style) > dates //
    start_date.style.marginLeft = '15px';
    end_date.style.marginRight = '15px';
    // style and position button_delete //
    btn_del.style.display = 'flex';
    btn_del.style.justifyContent = 'center';
    btn_del.style.alignItems = 'center';
    btn_del.style.position = 'absolute';
    btn_del.style.width = '1.1em';
    btn_del.style.height = '1.1em';
    btn_del.style.backgroundColor = 'black';
    btn_del.style.left = '1.5em';
    btn_del.style.top = '20px';
    btn_del.style.borderRadius = '5px';
    // delete-function //
    btn_del.addEventListener('click', function(){
        main_container.removeChild(container);
        localStorage.removeItem(id_1 + '___time_setter_');     //////// ?????????????????
        localStorage.removeItem(id_1);
    });
    // style btn_logo //
    btn_logo.style.color = 'white';
    btn_logo.style.fontSize = '1em';
    btn_logo.style.fontWeight = 'bolder';
    btn_logo.style.fontFamily = sonder_1;
    // append new Element > HTML (class=content) //
    const main_container = document.querySelector('.content');
    main_container.appendChild(container);
    // open function //
    // function logic for progress_bar //
    let x = 0;
    function progress_step(){
        if(localStorage.getItem(id_1 + '___time_setter_') < 100){
            let zw = localStorage.getItem(id_1) / 100;
            let ew = 1 / zw;
            x += ew;
            localStorage.setItem(id_1 + '___time_setter_', + x.toFixed(2));
            document.querySelector('#'+id_1).style.width = `${localStorage.getItem(id_1 + '___time_setter_')}%`;
            bar_currently.innerText = `${localStorage.getItem(id_1 + '___time_setter_')}%`;
            setTimeout(progress_step, 60 * 1000);  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> change the code from minute to day here
        }
        else{
            document.querySelector('#' + id_1).style.width = '100%';
            bar_currently.innerText = '100%';
            localStorage.removeItem(id_1);
            localStorage.removeItem(id_1 + '___time_setter_');
        }
    };
    setTimeout(progress_step, 60 * 1000);
}
// get info //
function keep_info(){
    let info_title = document.getElementById('title');
    let info_time = document.getElementById('time');

    if(info_title.value != '' && info_time.value != ''){
        create_object(info_title, info_time);
        info_title.value = '';
        info_time.value = '';
    }
}



function save_button(){
    let button_save = document.getElementById('btn_save');
    button_save.addEventListener('click', () => {keep_info();});
}


function update_progress_bar(bar, value){
    value = Math.round(value);
    bar.querySelector('.bar_fill').style.width = `${value}%`;
    bar.querySelector('.bar_text').textContent = `${value}%`;
}

save_button();



