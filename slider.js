var slides = ['#Home', '#About','#CV','#Research','#Software','#Music','#Contact'];

function init(e) {
    var in_tr_cats = document.getElementsByClassName("in_tr_cat");
    for (var i = 0; i < in_tr_cats.length; i++){
        var temp = document.createElement("td");
        temp.appendChild(document.createTextNode(in_tr_cats[i].textContent));
        var out_tr_cat = document.createElement("tr");
        out_tr_cat.appendChild(temp);
        out_tr_cat.className="out_tr_cat";
        in_tr_cats[i].parentNode.parentNode.insertBefore(out_tr_cat,in_tr_cats[i].parentNode);
    }
    function resize() {
        var fullwidths = document.getElementsByClassName("fullwidth");
        var tiles = document.getElementsByClassName("tile");
        var sidearrows = document.querySelectorAll("article label");
        var in_tr_cats = document.getElementsByClassName("in_tr_cat");
        var out_tr_cats = document.getElementsByClassName("out_tr_cat");
        var cvlogos = document.getElementsByClassName("cvlogo");
        var halfs = document.getElementsByClassName("half");
        if (1.1*window.innerHeight<window.innerWidth) {
            for (var i = 0; i < fullwidths.length; i++){fullwidths[i].style.display='inline';}
            for (var i = 0; i < tiles.length; i++){tiles[i].style.width='67vw';}
            for (var i = 0; i < sidearrows.length; i++){sidearrows[i].style.visibility='visible';}
            for (var i = 0; i < in_tr_cats.length; i++){in_tr_cats[i].style.display='table-cell'}
            for (var i = 0; i < out_tr_cats.length; i++){out_tr_cats[i].style.display='none'}
        } else {
            for (var i = 0; i < fullwidths.length; i++){fullwidths[i].style.display='none';}
            for (var i = 0; i < tiles.length; i++){tiles[i].style.width='98vw';}
            for (var i = 0; i < sidearrows.length; i++){sidearrows[i].style.visibility='hidden';}
            for (var i = 0; i < in_tr_cats.length; i++){in_tr_cats[i].style.display='none'}
            for (var i = 0; i < out_tr_cats.length; i++){out_tr_cats[i].style.display='table-row'}
        }
        if (0.7*window.innerHeight<window.innerWidth) {
            for (var i = 0; i < cvlogos.length; i++){cvlogos[i].style.display='table-cell'}
            for (var i = 0; i < halfs.length; i++){halfs[i].style.maxWidth='45%';halfs[i].style.minWidth='20%';halfs[i].style.width='auto';if(halfs[i].getElementsByTagName('img').length>0){halfs[i].style.display='inline-block';}}
        } else {
            for (var i = 0; i < cvlogos.length; i++){cvlogos[i].style.display='none'}
            for (var i = 0; i < halfs.length; i++){halfs[i].style.maxWidth='none';halfs[i].style.minWidth='none';halfs[i].style.width='90%';if(halfs[i].getElementsByTagName('img').length>0){halfs[i].style.display='none';}}
        }
    }
    resize();
    window.addEventListener('resize',function(e){resize();},false)
    if(slides.indexOf(window.location.hash)!==-1){
        document.getElementById(window.location.hash).checked = true;
        document.querySelector('nav label[for="'+window.location.hash+'"]').parentNode.className = "active";
    } else {
        document.getElementById("#Home").checked=true;
        document.querySelector('nav label[for="#Home"]').parentNode.className = "active";
    }
    function changeslide(input){
        if (input.checked){
                var hashtag = input.id;
                window.location.hash=hashtag;
                var oldli = document.querySelector('.active');
                var label = document.querySelector('nav label[for="'+hashtag+'"]');
                if(oldli){console.log("Disable old active li");oldli.className = "";}else{console.log("No "+'.active');}
                if(label){console.log("Enable "+hashtag+" active li");label.parentNode.className = "active";}else{console.log("No "+'nav label[for="'+hashtag+'"]');}
            }
    }
    function arrows(e) {
        if([32, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if (e.keyCode==33) {
            console.log('page up');
            var tile = document.querySelector(document.querySelector('input[name="slider"]:checked').id+"tab .tile");
            tile.scrollTop=0;
        }
        else if (e.keyCode==34) {
            console.log('page down');
            var tile = document.querySelector(document.querySelector('input[name="slider"]:checked').id+"tab .tile");
            tile.scrollTop=tile.scrollHeight;
        }
        else if (e.keyCode==35) {
            console.log('end');
            var input = document.getElementById(slides[slides.length-1]);
            input.checked=true;
            changeslide(input)
            console.log('Go to '+slides[slides.length-1]);
        }
        else if (e.keyCode==36) {
            console.log('home');
            var input = document.getElementById(slides[0]);
            input.checked=true;
            changeslide(input)
            console.log('Go to '+slides[0]);
        }
        else if (e.keyCode==37) {
            console.log('left');
            var input = document.getElementById(slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)-1+slides.length) % slides.length]);
            input.checked=true;
            changeslide(input)
            console.log('Go to '+slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)-1+slides.length) % slides.length]);
        }
        else if (e.keyCode==38) {
            console.log('up');
            var tile = document.querySelector(document.querySelector('input[name="slider"]:checked').id+"tab .tile");
            tile.scrollTop-=100;
        }
        else if (e.keyCode==39) {
            console.log('right');
            var input = document.getElementById(slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)+1) % slides.length]);
            input.checked=true;
            changeslide(input)
            console.log('Go to '+slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)+1) % slides.length]);
        }
        else if (e.keyCode==40) {
            console.log('down');
            var tile = document.querySelector(document.querySelector('input[name="slider"]:checked').id+"tab .tile");
            tile.scrollTop+=100;
        }
    }
    window.addEventListener('keydown',arrows,false);
    for (var i = 0; i < slides.length; i++) {
        console.log(slides[i]);
        document.getElementById(slides[i]).addEventListener('change',function(e){
            var input = e.target;
            changeslide(input)
        }, false)
    }
    var hammertime = new Hammer(window);
    hammertime.on("panleft panright",function(e) {
        if (e.type=="panleft"){
            console.log('left');
            var input = document.getElementById(slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)-1+slides.length) % slides.length]);
            input.checked=true;
            changeslide(input)
            console.log('Go to '+slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)-1+slides.length) % slides.length]);
        }
        else if (e.type=="panright"){
            console.log('right');
            var input = document.getElementById(slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)+1) % slides.length]);
            input.checked=true;
            changeslide(input)
            console.log('Go to '+slides[(slides.indexOf(document.querySelector('input[name="slider"]:checked').id)+1) % slides.length]);
        }
    });
}

window.addEventListener('load',init,false);


