import React from 'react'


const Map = () => {


  return (
    <div className="mapouter">
        <div className="gmap_canvas" style={{display: 'flex'}}>
            <iframe style={{height: '700px', width: '80%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="gmap_iframe" width="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=ahmed tayseer&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        </div>
    </div>
  )
}




export default Map
