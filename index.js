let clicks = [];

let label = document.createElement('label');
label.innerText = "";
document.getElementById('divTag').appendChild(label);
document.getElementById('divTag').addEventListener('mousemove', (e) => {
  let pos = `(${e.clientX}, ${e.clientY})`;
  label.innerText = pos;
  label.style.position = 'absolute';
  label.style.top = e.clientY + "px";
  label.style.left = (e.clientX + 10) + "px";
});


document.getElementById('divTag').addEventListener('mouseup', (e) => {
  e.preventDefault();
  if (!(e.target && e.target.id == 'divTag'))
    return
  let div = document.createElement('div');
  let divId = Date.now();
  console.log("DivId -> " + divId);
  div.setAttribute('id', divId);
  document.getElementById('divTag').appendChild(div);
  div.style.position = 'absolute';
  div.style.top = e.clientY + "px";
  div.style.left = e.clientX + "px";

  let demo = document.createElement('label');
  let demoId = Date.now();
  console.log("DemoId -> " + demoId);
  demo.setAttribute('id', `label${demoId}`);
  demo.innerText = 'Hello';
  document.getElementById(divId).appendChild(demo);

  clicks.push({
    'text': 'Hello',
    'x': e.clientX,
    'y': e.clientY,
    'id': demoId
  })
  console.log(clicks);

  let editBtn = document.createElement('input');
  editBtn.setAttribute('type', 'button');
  editBtn.setAttribute('value', "edit");
  editBtn.setAttribute('id', `edit${demoId}`);
  editId = `edit${demoId}`;
  editBtn.setAttribute('onclick', `editFunc(${demoId}, label${demoId}, edit${demoId}, cancel${demoId}, save${demoId})`);
  document.getElementById(divId).appendChild(editBtn);

  let saveBtn = document.createElement('button');
  saveBtn.innerHTML = 'save';
  saveBtn.setAttribute('id', `save${demoId}`);
  saveId = `save${demoId}`;
  document.getElementById(divId).appendChild(saveBtn);
  saveBtn.style.display = "none";

  let cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.setAttribute('id', `cancel${demoId}`);
  cancelId = `cancel${demoId}`;
  document.getElementById(divId).appendChild(cancelBtn);
  cancelBtn.style.display = "none";

  let removeBtn = document.createElement('button');
  removeBtn.innerHTML = 'remove';
  removeBtn.setAttribute('id', `remove${demoId}`);
  removeId = `remove${demoId}`;
  removeBtn.setAttribute('onclick', `removeFunc(${demoId})`);
  document.getElementById(divId).appendChild(removeBtn);

});



function editFunc(editId, labelEle, editEle, cancelEle, saveEle) {
  let value = labelEle.innerText;
  labelEle.innerText = "";

  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('value', value);
  inputId = `input${editId}`;
  input.setAttribute('id', inputId);
  labelEle.appendChild(input);

  editEle.style.display = "none";
  saveEle.style.display = "block";
  cancelEle.style.display = "block";

  saveEle.addEventListener('click', () => {

    let inputVal = input.value;
    console.log(inputVal);
    labelEle.innerText = inputVal;

    editEle.style.display = "block";
    saveEle.style.display = "none";
    cancelEle.style.display = "none";

    let x = editId;
    let index = clicks.findIndex(({ id }) => x === id);
    console.log(index);
    let val = clicks[index]
    val.text = inputVal;
    console.log(clicks);
  });



  cancelEle.addEventListener('click', () => {
    labelEle.innerText = value;

    editEle.style.display = "block";
    saveEle.style.display = "none";
    cancelEle.style.display = "none";
  });

}


function removeFunc(Id) {
  var x = Id;
  console.log(x);
  let index = clicks.findIndex(({ id }) => x === id);
  console.log(index);
  clicks.splice(index, 1);
  var obj = document.getElementById(Id);
  console.log(obj);
  obj.remove();

}