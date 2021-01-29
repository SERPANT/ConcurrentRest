const axios = require("axios")

const payload = {
    smvs_appointmentdatetime : "2021-01-29T08:30:00Z",
    smvs_associatedclinicday : "566226d4-1562-eb11-a812-0022481e27b7",
    smvs_associatedpatientid : "1ef7a561-ff61-eb11-a812-0022481e27b7"
}

const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL3NtdnMtZGV2LmNybS5keW5hbWljcy5jb20vIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2E0ZWIzZjUtNjkyNi00N2E2LWI1MGQtMDU0YTRkMzZkZmRkLyIsImlhdCI6MTYxMTkxNDY5MiwibmJmIjoxNjExOTE0NjkyLCJleHAiOjE2MTE5MTg1OTIsImFpbyI6IkUyWmdZSENlMDFVaDVKZnJxM3oyUzlQeG14YWJBQT09IiwiYXBwaWQiOiI5OTQ0ODczNy03NTQxLTQ5MWUtYmQ4NC1hNDk3Nzc5OWE2NmQiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jYTRlYjNmNS02OTI2LTQ3YTYtYjUwZC0wNTRhNGQzNmRmZGQvIiwib2lkIjoiNjE5MjdlYjAtYjNjOC00MGMzLWEwNzQtMjAyNzg2YjQ3ZmRlIiwicmgiOiIwLkFBQUE5Yk5PeWlacHBrZTFEUVZLVFRiZjNUZUhSSmxCZFI1SnZZU2tsM2VacG0wU0FBQS4iLCJzdWIiOiI2MTkyN2ViMC1iM2M4LTQwYzMtYTA3NC0yMDI3ODZiNDdmZGUiLCJ0aWQiOiJjYTRlYjNmNS02OTI2LTQ3YTYtYjUwZC0wNTRhNGQzNmRmZGQiLCJ1dGkiOiJFa2QzNEJnQkpVMklmbWtiSE5CUkFBIiwidmVyIjoiMS4wIn0.eQyoVgEDnDwY3euYGm0BdMiRtt5gNwd2N2R2lgwZo26wQgzHdW9TL_CSjjJ5Yrvd_6JiIVL0cDDas5aVmn_bmKEk283qAIEQcTAwhF0ejm4qsRACbK02OJ0ZmYAI4q6PC2j4SR6zJuMnyAhMrMSds5OUrn33yOHia7HRkh489ei5bmmjJ8q8vpke7ZTmstKQVoO7Y2-TI194W-_oVLNUUBfkLm9QtQnxN54OI6SlXo5NbdWSOSxYyIODnH05_ZBNUvAlnlLaYAT7zwMdRJi8ExsQTdayCCMANE9W3FFYRBNVSb_eCwvUTRcFO7u7s2KKZsrR9ZfsZn5eRv8iDMOvzQ';

const requestCount = 100;

async function createAppointment(payload) {
    const url = "https://smvs-dev.crm.dynamics.com/api/data/v9.1/msemr_appointmentemrs";

    const headers = {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': ' application/json',
        'OData-MaxVersion': ' 4.0',
        'OData-Version': ' 4.0',
        Prefer: 'odata.include-annotations="*", return=representation',
      };

      try {
     await axios.post(url, payload, { headers });

     return  {
        status: 'Success',
        value: true
    }
      }catch(err) {

        const { status, data } = err.response;

          return {
              status: 'failed : status: ' + status,
              data: data.error.message,
               value:false
          }
      }
}

async function start() {
    const promiseList = [];

    for(let i =0; i < requestCount; i++)
    {
        let createAppointmentPromise = createAppointment(payload);

        createAppointmentPromise;

        promiseList.push(createAppointmentPromise);
    }

    const ans = await Promise.all(promiseList);

    console.log('Result --------------------------------------------------------');

    (ans).forEach(element => {
        console.log(element.value);  
    });
}

start();