
(function() {
  let jobs
  let labelsArray = []
  fetch("data.json")
  .then(data => data.json())
  .then(res => {
    jobs = res
    jobs.forEach(job => {
   
      let featured
      //add logo
      const logoContainer = document.createElement('div')
      logoContainer.classList.add('jobLogo')
      const logo = document.createElement('img')
      logo.src = job.logo
      logo.alt = 'logo'
      logoContainer.appendChild(logo)

      //add company + labels
      const companyNameContainer = document.createElement('div')
      companyNameContainer.classList.add('companyNameContainer')
      const companyName = document.createElement('span')
      companyName.classList.add('companyName')
      companyName.innerText = job.company

      //add labels
      const labels = document.createElement('div')
      labels.classList.add('labels')
      const newLabel = document.createElement('span')
      const featuredLabel = document.createElement('span')
      if(job.new) {
        newLabel.classList.add('new')
        newLabel.innerText='NEW!'
      }
      if(job.featured) {
        featuredLabel.classList.add('featured')
        featuredLabel.innerText='FEATURED'
        featured = true
      }
      labels.append(newLabel, featuredLabel)

      companyNameContainer.append(companyName, labels)


      //add position and details
      const positionName = document.createElement('h2')
      positionName.innerText = job.position
      const positionDetails = document.createElement('div')
      positionDetails.classList.add ('details')
      const postedAt = document.createElement('span')
      const contract = document.createElement('span')
      const location = document.createElement('span')
      postedAt.innerText = job.postedAt
      contract.innerText = job.contract
      location.innerText = job.location
      positionDetails.append(postedAt, contract, location)
      
      //add languages
      
      const languagesContainer = document.createElement('div')
      languagesContainer.classList.add('languages')
      const role = document.createElement('span')
      const level = document.createElement('span')
      role.classList.add('label')
      level.classList.add('label')
      role.innerText=job.role
      level.innerText=job.level
      languagesContainer.classList.add(job.role, job.level)
      const languages = job.languages
      const tools = job.tools
      languagesContainer.append(role, level)
      languages.forEach(language => {
        const languageLabel = document.createElement('span')
        languageLabel.classList.add('label')
        languageLabel.innerText=language
        languagesContainer.classList.add(language)
        languagesContainer.appendChild(languageLabel)

      })
      tools.forEach(tool=> {
        const toolLabel = document.createElement('span')
        toolLabel.classList.add('label')
        toolLabel.innerText=tool
        languagesContainer.classList.add(tool)
        languagesContainer.appendChild(toolLabel)
      })


      addJobHtml(logoContainer, positionName, positionDetails, companyNameContainer, languagesContainer, featured)
     




  })
  filter()
})

function addJobHtml(logo, position, positionDetails, companyNameContainer, languagesContainer, featured) {
  const mainContainer = document.querySelector('#list')
  const container = document.createElement('section')
  const containerLeft = document.createElement('div')
  const jobInfoContainer = document.createElement('div')
  container.classList.add('job')
  container.setAttribute("role", "main");
  if(featured) container.classList.add('featured')
  containerLeft.classList.add('flex')
  jobInfoContainer.classList.add('jobInfo')
  jobInfoContainer.append(companyNameContainer, position, positionDetails)
  containerLeft.append(logo, jobInfoContainer)
  container.append(containerLeft, languagesContainer)
  mainContainer.appendChild(container)
}


function filter() {
  
  const labels = document.querySelectorAll('.label')
  const filterContainer = document.createElement('div')
  filterContainer.classList.add('languages')
  


  labels.forEach(label => label.addEventListener('click', (e) => {
    const labelText = e.target.innerText
    if (!labelsArray.includes(labelText)) {
    filterLabels.style.display='flex'
    const labelContainer = document.createElement('div')
    labelContainer.classList.add('labelContainer')

    const label = document.createElement('span')
    label.innerText = e.target.innerText
    label.classList.add('label')
    
    const clearIcon = document.createElement('div')

    clearIcon.classList.add('clearIcon')
    const clearIconImage = document.createElement('img')
    clearIconImage.dataset.label = e.target.innerText
    clearIconImage.src='/images/icon-remove.svg'
    clearIconImage.alt = 'logo'
    clearIcon.appendChild(clearIconImage)
   
      labelContainer.append(label, clearIcon)
      labelsArray.push(e.target.innerText)
      console.log(labelsArray)
      filterContainer.appendChild(labelContainer)
      filterLabels.appendChild(filterContainer)
const labels = e.target.parentNode

let filterContainers = document.querySelectorAll(('.job .languages'))

      filterContainers.forEach(job => {
        if(!job.classList.contains(labelText)) {
          job.parentNode.classList.add('hide')
         
        }
       
      })
    }

  }))
}

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', () => {
  labelsArray = []
  document.querySelector('#filter .languages').innerHTML=''
  let filterContainers = document.querySelectorAll(('.job'))

      filterContainers.forEach(job => {
      
      job.classList.remove('hide')
      document.querySelector('#filter').style.display='none'
        })
       
      
})

const filterLabels = document.querySelector('#filter') //container on the top
filterLabels.addEventListener('click', (e) => {

  let filterContainers = document.querySelectorAll(('.job .languages')) //job containers

  if(e.target.dataset.label) {
    filterContainers.forEach(job => {
      
        labelsArray.every(label => {
        if(job.classList.contains(label)) {
          job.parentNode.classList.remove('hide')
          const index = labelsArray.indexOf(e.target.dataset.label);
          if (index > -1) { // only splice array when item is found
          labelsArray.splice(index, 1); // 2nd parameter means remove one item only
        }
        const img = e.target.parentNode
        img.parentNode.remove()
        }
        else  job.parentNode.classList.add('hide')
      })
      
      if (labelsArray.length===0) {
        filterLabels.style.display='none'
        job.parentNode.classList.remove('hide')
      }

    })}})
  

})();










  
  
    


  





