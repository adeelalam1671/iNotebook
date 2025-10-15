const About = () => {
  return (
    <div>
      {/* Top Banner with Background */}
      <div 
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/633409/pexels-photo-633409.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop:"40px",
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          
          
          textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
        }}
      >
        About Me
      </div>

      {/* Main Content Section */}
      <div className="bg-dark text-light py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column - Text */}
            <div className="col-md-6 ">
              <h2 className="mb-4">
                Inotebook is a secure and user-friendly note-taking application.
              </h2>
              <p style={{ textAlign: 'justify' }}>
                It helps you manage your notes efficiently and securely from anywhere. Built with React, Bootstrap, and modern technologies, it offers a clean and responsive interface to boost your productivity.
              </p>
            </div>

            {/* Right Column - Large Image + Two Small Images */}
            <div className="col-md-6">
              {/* Main Large Image */}
              <img
                src="https://media.wired.com/photos/6802c1c668bf21be6e9c8d97/4:3/w_640%2Cc_limit/reMarkable-2-Digital-Notebook-Reviewer-Photo-SOURCE-Nena-Farrell.jpg"
                alt="Notebook"
                className="img-fluid rounded mb-4"
              />

              {/* Two Small Images in a Row */}
              <div className="row">
                <div className="col-6">
                  <img
                    src="https://media.istockphoto.com/id/1902034840/photo/electronic-document-management-system-concept-searching-and-business-managing-files-online.jpg?s=1024x1024&w=is&k=20&c=YCwujyV5f8q0vihxwgFZbcOCpoSr86YORVicEncd92M="
                    alt="Small 1"
                    className="img-fluid rounded"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-6">
                  <img
                    src="https://media.istockphoto.com/id/2038158183/photo/professional-woman-typing-on-a-keyboard-in-an-office-environment.jpg?s=2048x2048&w=is&k=20&c=8FxvBW0SoJOU338u4RB2Fp_pxf6yKQPZtdKI1ZUTBBw="
                    alt="Small 2"
                    className="img-fluid rounded"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
