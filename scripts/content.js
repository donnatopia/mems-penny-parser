// Helper Functions
const getStatus = (className) => {
  if (className === 'gone') {
    return -2;
  } else if (className === 'outoforder') {
    return -1;
  } else {
    return 0;
  }
}

const getTitleAndAddress = (innerHTML) => {
  const result = {
    title: '',
    address: '',
  }

  const splitHTML = innerHTML.split('<br>');

  result.title = splitHTML[0].replace(/<\/?s>/g, '');
  result.address = splitHTML[1].replace(/<\/?span[^>]*>/g, '');

  return result;
}

const getWebsite = (innerHTML) => {
  return 'http://209.221.138.252/' + innerHTML.match(/href="([^"]+)"/)[1];
}

const getDate = (date) => {
  let parts = date.split('/');
  let year = parseInt(parts[2]) + 2000;
  let month = parseInt(parts[0]) - 1;
  let day = parseInt(parts[1]);

  return new Date(year, month, day);
}

const addQuotes = (string) => {
  return `"${string}"`
}


// Creating CSV File
const table = document.getElementsByClassName('tbllist')[0];

if (table) {
  const attributes = {
    id: 0,
    map_id: 1,
    title: '',
    status: '',
    address: '',
    city: '',
    designs: '',
    website: '',
    last_updated: '',
  };

  let csvContent = '';

  for (let attribute in attributes) {
    csvContent += attribute + ', '
  }

  csvContent += '\n';

  var rows = table.rows;
  for (let id = 1; id < rows.length; id++) {
    let cells = rows[id].cells;
    let { title, address } = getTitleAndAddress(cells[0].innerHTML);

    attributes.id = id;
    attributes.title = addQuotes(title);
    attributes.address = addQuotes(address);
    attributes.status = getStatus(rows[id].className);
    attributes.city = addQuotes(cells[1].textContent.trim());
    attributes.designs = addQuotes(cells[2].textContent.trim());
    attributes.website = addQuotes(getWebsite(cells[3].innerHTML));
    attributes.last_updated = getDate(cells[4].textContent.trim());

    for (let attribute in attributes) {
      csvContent += attributes[attribute] + ', '
    }

    csvContent += '\n';
  }

  // var rows = csvContent.split('\n');
  // for (var i = 0; i < rows.length; i++) {
  //   const badge = document.createElement('p');
  //   badge.textContent = rows[i];
  //   table.insertAdjacentElement('beforebegin', badge);
  // }

} else {
  console.log('no valid table')
}