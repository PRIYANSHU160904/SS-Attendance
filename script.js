var part2 = document.getElementById("alert2");
var part = document.getElementById("alert");
var output = document.getElementById("output");
var completed = document.getElementById("complete");
part.style.visibility = "hidden";
part2.style.visibility = "hidden";
var currentStatus = false;
var nos = document.getElementById("nos");
var section = document.getElementById("section");
var file = [];
var subj = []; 
var button = document.getElementById("sum");
var listcontent;
var list = document.getElementById("list");
var strength = document.getElementById("strength");
var out;
var outAbsent;
var fp = document.getElementById("fp");
fp.style.visibility = "hidden";

function formSubmit(){
    if(section.value == 0){
       part2.style.visibility = "visible";
       part2.innerHTML = '<div class="alert alert-warning" role="alert">Please select your Section!</div>'     
    }
    else if(strength.value == 0){
        part2.style.visibility = "visible";
        part2.innerHTML = '<div class="alert alert-warning" role="alert">Please type your Class Strength!</div>' 
    }
    else if(nos.value == 0){
        part2.style.visibility = "visible";
        part2.innerHTML = '<div class="alert alert-warning" role="alert">Please select No of screenshots!</div>' 
    }
    else {
        part2.style.visibility = "hidden";
        generate();
    }
}

function generate()
{
    var content = [];

    for (var i = 0; i < nos.value;i++)
    {
        content = content + '<div class="row"><input id="subject' + (i+1) + '" type="text" class="form-control" placeholder="Subject ' + (i+1) +'"><br><br><input class="form" type="file" id="file-selector' + (i+1) + '"></div><br>';
    }

    content = content + '<br><input onclick="clickHandler();" type="submit" value="Calculate" id="sum">';

    document.getElementById("main").innerHTML = content;

    file = [];
    subj = []; 
    button = document.getElementById("sum");
}

function clickHandler(){
    fp.innerHTML = '<div class="accordion" id="accordionExample" style="width: 95%; margin: auto;"><div class="card"><div class="card-header" id="headingOne"><h2 class="mb-0"><button class="btn btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Presentees</button></h2></div><div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample"><div id="Presentees" class="card-body"></div></div></div><div class="card"><div class="card-header" id="headingTwo"><h2 class="mb-0"><button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Absentees</button></h2></div><div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample"><div id="Absentees" class="card-body"></div></div></div><div class="card"><div class="card-header" id="headingThree"><h2 class="mb-0"><button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Output</button></h2></div><div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample"><div id="list" class="card-body"></div></div></div></div>';
    part.style.visibility = "hidden";
    part2.style.visibility = "hidden";
    if(!currentStatus){
        for (i = 0; i < nos.value; i++){
            file[i] = document.getElementById("file-selector" + (i+1)).files[0];
            subj[i] = document.getElementById("subject" + (i+1)).value;
            if (document.getElementById("file-selector" + (i+1)).files.length == 0){
                part2.style.visibility = "visible";
                part2.innerHTML = '<div class="alert alert-warning" role="alert">Any file input must not be empty!</div>';
                return;
            }
        }

        for (i = 0; i < nos.value; i++){
            part.style.visibility = "visible";
            output.innerHTML = "Processing";
            completed.innerHTML = "Please wait... It may take a few minutes..."
            Tesseract.recognize(
            file[i],
            'eng',
            { logger: m => console.log(m)}
            ).then(({ data: { text } }) => {console.log(text); txt = text; listcontent = listcontent + subj[i] + ':<br><br>' + txt + '<br><br>';var tmp = "";
            part.style.visibility = "hidden";
            currentStatus = true;
            part.style.visibility = "visible";
            present = [];
        
                for(i =0; i < txt.length;i++)
            {
                txt = txt.replace(" ","");
                tmp ="";
                if (txt.charAt(i) === section.value){
                    if (!isNaN (txt.charAt(i+1))){
                        tmp = txt.charAt(i+1).toString();
                        if(!isNaN(txt.charAt(i+2))){
                            tmp = tmp + txt.charAt(i+2).toString();
                        }
                    }
                }
                
                if(tmp !== ""){
                    present.push(parseInt(tmp));
                }
        
            }
            console.log(present);
            out = subj[i] + ':<br><br>';
            present.sort();
            for(var a = 0;a < present.length;a++){
                out = out + present[a] + ", ";
            }

            out = out + '<br><br>';
        
            outAbsent = subj[i] + '<br><br>';
            for(var b = 1;b <= strength.value;b++){
                if(!present.includes(b)){
                    outAbsent = outAbsent + b + ", ";
                }
            }
            output.innerHTML = '';
            completed.innerHTML = '';
            part.style.visibility = "hidden";
            part2.style.visibility = "visible";
            part2.innerHTML = '<div class="alert alert-success" role="alert">Completed!</div>';
            document.getElementById("Presentees").innerHTML = out;
            document.getElementById("Absentees").innerHTML = outAbsent;
            currentStatus = false;
            fp.style.visibility = "visible";
        
            });
        }
    }

    else{
        part2.style.visibility = "visible";
        part2.innerHTML = '<div class="alert alert-warning" role="alert">Please wait for the current process to finish!</div>';

    }
}



