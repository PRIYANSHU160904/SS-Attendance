var part2 = document.getElementById("alert2");
var part = document.getElementById("alert");
var output = document.getElementById("output");
var completed = document.getElementById("complete");
part.style.visibility = "hidden";
part2.style.visibility = "hidden";
var result = document.getElementById("accordionExample");
result.style.visibility = "hidden";
var currentStatus = false;
var nos = document.getElementById("nos");
var section = document.getElementById("section");
var file = [];
var subj = []; 
var button = document.getElementById("sum");

function formSubmit(){
    if(document.getElementById('section').value == 0){
       part2.style.visibility = "visible";
       part2.innerHTML = '<div class="alert alert-warning" role="alert">Please select your Section!</div>'     
    }
    else if(document.getElementById('nos').value == 0){
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
    var nos = document.getElementById("nos");
    var section = document.getElementById("section");
    var content = [];

    for (var i = 0; i < nos.value;i++)
    {
        content = content + '<div class="row"><input id="subject' + (i+1) + '" type="text" class="form-control" placeholder="Subject' + (i+1) +'"><br><br><input class="form" type="file" id="file-selector' + (i+1) + '"></div><br>';
    }

    content = content + '<br><input type="submit" value="Calculate" id="sum">';

    document.getElementById("main").innerHTML = content;

    file = [];
    subj = []; 
    button = document.getElementById("sum");
}

function clickHandler(){
    if(!currentStatus){
        for (i = 0; i < nos.value; i++){
            file[i] = document.getElementById("file-selector" + (i+1)).files[0];
            subj[i] = document.getElementById("subject" + (i+1)).value;
            if (document.getElementById("file-selector" + (i+1)).files.length == 0){
                output.innerHTML = "";
                completed.innerHTML = "";
                part2.style.visibility = "visible";
                part2.innerHTML = '<div class="alert alert-warning" role="alert">Any file input must not be empty!</div>';
                currentStatus = false;
                return;
            }
        }

        for (i = 0; i < nos.value; i++){
            output.innerHTML = "";
            completed.innerHTML = "";
            part2.innerHTML = "";
            part.style.visibility = "visible";
            output.innerHTML = "Processing";
            present = [];
            Tesseract.recognize(
            file,
            'eng',
            { logger: m => completed.innerHTML = Math.round(m.progress.toFixed(2) * 100 ) + "%"}
            ).then(({ data: { text } }) => {console.log(text); txt = text;lists.innerHTML = txt;var tmp = "";
            output.innerHTML = "";
            completed.innerHTML = "";
            part.style.visibility = "hidden";
            part2.style.visibility = "visible";
            part2.innerHTML = "<div class='alert alert-success' role='alert'>Completed</div>";
        
                for(i =0; i < txt.length;i++)
            {
                txt = txt.replace(" ","");
                tmp ="";
                if (txt.charAt(i) === "C"){
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
            var out = "";
            present.sort();
            for(var a = 0;a < present.length;a++){
                out = out + present[a] + ", ";
            }
            document.getElementById("Presentees").innerHTML = out;
        
            var outAbsent = "";
            present.push(6);
            present.push(22);
            for(var b = 1;b <= 47;b++){
                if(!present.includes(b)){
                    outAbsent = outAbsent + b + ", ";
                }
            }
            document.getElementById("Absentees").innerHTML = outAbsent;
            result.style.visibility = "visible";
            currentStatus = false;
        
            });
        }
    }

    else{
        part2.style.visibility = "visible";
        part2.innerHTML = '<div class="alert alert-warning" role="alert">Please wait for the current process to finish!</div>';

    }
}

button.addEventListener("click",clickHandler);

