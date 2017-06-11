import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import logo from './icon.jpg';
import './App.css'; 

  const jobs = [];

function addJobs(quantity) {
  const startId = jobs.length;
  const fn = 'Test Participant';
  const em = 'test.nord';
  const em1 = '@integrify.com'  
  for (let i = 1; i < quantity; i++) {
    const id = startId + i;
    const phone = '040555454' + i;
    const randemail = em + i + em1; 
    const randfn = fn + i; 
       jobs.push({
      id: id,
      name:  randfn,
      email: randemail,
      number: phone
      
    });
  }
}

addJobs(21);

function onRowSelect(row, isSelected) {
  console.log(row);
  console.log(`selected: ${isSelected}`);
}

function onSelectAll(isSelected) {
  console.log(`is select all: ${isSelected}`);
}

function onAfterSaveCell(row, cellName, cellValue) {
  console.log(`Save cell ${cellName} with value ${cellValue}`);
  console.log('The whole row :');
  console.log(row);
}

function onAfterTableComplete() {
  console.log('Table render complete.');
}

function onAfterDeleteRow(rowKeys) {
  console.log('onAfterDeleteRow');
  console.log(rowKeys);
}

function onAfterInsertRow(row) {
  console.log('onAfterInsertRow');
  console.log(row);
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  selected: [], // default select on table
  bgColor: 'rgb(238, 193, 213)',
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  afterSaveCell: onAfterSaveCell
};

const options = {
  paginationShowsTotal: true,
  sortName: 'name',  // default sort column name
  sortOrder: 'desc',  // default sort order
  afterTableComplete: onAfterTableComplete, // A hook for after table render complete.
  afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
  afterInsertRow: onAfterInsertRow   // A hook for after insert rows
};



function trClassNameFormat(rowData, rIndex) {
  return rIndex % 3 === 0 ? 'third-tr' : '';
}

function nameValidator(value) {
  if (!value) {
    return 'Full Name is required!';
  } else if (value.length < 3) {
    return 'Full Name length must great 3 char';
  }
  return true;
}

function emailValidator(value) {
  if (!value) {
    return 'Email is required!';
      } else if(value.length < 3){
        return 'Please enter an valid email address';
      }
  return true;
}

function numberValidator(value) {
  if (!value) {
    return 'Telephone number is required!';
      } else if(value.length < 3){
        return 'Please enter Telephone number';
      }
  return true;
}



export default class App extends React.Component {
  render() {

    return (

          <div className="Layout">
          <div className="App-header">
          <h3></h3>
          <img src={logo} className="App-logo" alt="logo"/>   Nord Software
            </div> 
               
          <div className="App-header1">
          <br></br>
          <h3>List of participants</h3>
          <br></br>
       <BootstrapTable data={ jobs }
        trClassName={ trClassNameFormat }
        selectRow={ selectRowProp }
        cellEdit={ cellEditProp }
        options={ options }
        insertRow
        deleteRow
        hover>
        <TableHeaderColumn dataField='id' dataSort isKey autoValue>Id</TableHeaderColumn>
        <TableHeaderColumn dataField='name' className='good' dataSort
          editable={ { type: 'textarea', validator: nameValidator } }>Full Name</TableHeaderColumn>
        <TableHeaderColumn dataField='email' className='good' dataSort 
         editable={ { type: 'textarea', validator: emailValidator } }>Email address</TableHeaderColumn>
        <TableHeaderColumn dataField='number' dataSort
          editable={ { type: 'PhoneNumber', validator: numberValidator, options: { values: ' 0' } } }>PhoneNumber</TableHeaderColumn>
      </BootstrapTable>
      
        </div>      
        </div>
              
    );
  }
}