/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
data = new Array();
/* global getAssetRegistry getFactory emit */
/**
 * Submit an Enginnner's validation
 * @param {org.acme.contract.Engineer_Validate} engineerValidate - valdation to be submitted
 * @transaction
 */

async function engineerValidate(engineerValidate){
  const contract = engineerValidate.engineerValidationData.contract;
  if(!engineerValidate.engineerValidationData.validation){
    engineerValidate.engineerValidationData.validation = []
  }
  
    for(var i = 0; i<data.length;i++){
      if(engineerValidate.engineerValidationData.validation[i] !== data[i]){
        engineerValidate.engineerValidationData.contract.engineerValidationStatus = "Not Validated";
      }
      else{
        engineerValidate.contract.engineerValidationStatus = "Validated";       
      }
    }
    const contractValidationRegistry = await getAssetRegistry('org.acme.contract.Contract');
    await contractValidationRegistry.update(contract);
}


/**
 * Submit a LabourRep's validation
 * @param {org.acme.contract.LabourRep_Validate} labourRepValidate - valdation to be submitted
 * @transaction
 */
async function labourRepValidate(labourRepValidate){
  const contract = labourRepValidate.labourRepValidationData.contract;
  if(!labourRepValidate.labourRepValidationData.validation){
    labourRepValidate.labourRepValidationData.validation = []
  }
  
    for(var i = 0; i<data.length;i++){
      if(labourRepValidate.labourRepValidationData.validation[i] !== data[i]){
        labourRepValidate.labourRepValidationData.contract.labourRepValidationStatus = "Not Validated";
      }
      else{
        labourRepValidate.contract.labourRepValidationStatus = "Validated";       
      }
    }
    const contractValidationRegistry = await getAssetRegistry('org.acme.contract.Contract');
    await contractValidationRegistry.update(contract);
}


/**
 * Submit a Supplier's validation
 * @param {org.acme.contract.Supplier_Validate} SupplierValidate - valdation to be submitted
 * @transaction
 */
async function suppplierValidate(supplierValidate){
  const contract = supplierValidate.supplierValidationData.contract;
  if(!supplierValidate.supplierValidationData.validation){
    supplierValidate.supplierValidationData.validation = []
  }
  
    for(var i = 0; i<data.length;i++){
      if(supplierValidate.supplierValidationData.validation[i] !== data[i]){
        supplierValidate.supplierValidationData.contract.supplierValidationStatus = "Not Validated";
      }
      else{
        supplierValidate.contract.supplierValidationStatus = "Validated";       
      }
    }
    const contractValidationRegistry = await getAssetRegistry('org.acme.contract.Contract');
    await contractValidationRegistry.update(contract);
}

/**
 * Submit a document
 * @param {org.acme.contract.SubmitDocument} submitDocument - document to be submitted
 * @transaction
 */
async function submitDocument(submitDocument){
    const document = submitDocument.document;
    if(document.contract.state !== 'OPEN'){
        throw new Error('Contract is closed');
    }
    if (!document.contract.documents) {
        document.contract.documents = [];
    }   
    document.contract.documents.push(submitDocument);
    data.push("1");
    const documentRegistry = await getAssetRegistry('org.acme.contract.Document');
    await documentRegistry.update(document);
    const contractRegistry = await getAssetRegistry('org.acme.contract.Contract');
    await contractRegistry.update(document.contract);  
  
}
/**
 * Close the contract once the project is over
 * @param {org.acme.contract.CloseContract} closeContract - the contract
 * @transaction
 */
async function closeContract(closeContract){
    const contract = closeContract.contract;
    if(contract.state !== 'OPEN'){
        throw new Error('Closed Already');
    }
    contract.state = 'CLOSED';
    const contractAssetRegistry = await getAssetRegistry('org.acme.contract.Contract');
    await contractAssetRegistry.update(contract);
}
