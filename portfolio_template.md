# Your Name - Software Developer Portfolio

## About Me
I'm a Computer Science sophomore at National Tsing Hua University passionate about building impactful software solutions. With a strong foundation in full-stack development and particular interest in mobile applications, I'm eager to contribute to innovative projects at LINE through the Tech Fresh program.

[Resume](resume-link) | [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourusername) | [Email](mailto:youremail@example.com)

## Education
**National Tsing Hua University**
- Bachelor of Science in Computer Science (Expected: 2027)
- Relevant Coursework: Data Structures, Algorithms, Machine Learning, Web Development
- GPA: 3.89/4.00

---

## Technical Skills

### Programming Languages
- **Advanced:** C++
- **Intermediate:** C, Python
- **Familiar:** Rust, Verilog, HTML/CSS

### Frontend Development
- React.js, HTML5, CSS3
- Streamlit

### Machine Learning & AI
- PyTorch
- Diffusion Models
- HuggingFace models 
- Audio processing (librosa, torchaudio)

### Hardware Development
- FPGA Programming
- SystemVerilog HDL
- Xilinx Vivado
- State machine architecture
- VGA controller implementation

### API & Integration
- RESTful API integration
- OAuth authentication
- Spotify Web API

### DevOps & Tools
- Git/GitHub
- Anaconda
- Linux
- Terminal UI development 

---

## Extra-Curricular Activities
- **HackMeiChu** - Development Team (2025)
  - Vue frontend development for event website
  - Backend API integration and data management

## Certificates & Achievements
- TOEIC 965 - Issued by ETS (2021)
- A+ in Introduction to Programming and Competitive Programming
- A in Logic Design, Data Structures, Machine Learning

## Languages
- English (Fluent)
- Chinese (Native)

## Interests & Hobbies
- Trading bot development and quantitative finance
- Web games development and interactive experiences
- Machine learning applications in audio and music
- Music and electric guitar

---

## Featured Projects

### Bird Vocalization Generation Using Diffusion Models

![Project Screenshot](screenshot-placeholder-link)

**Overview:**
A group machine learning course project that generates realistic bird vocalizations using advanced generative models.

**Contributions:**
- Implemented data preprocessing pipeline
- Integrated HuggingFace sound recognition models
- Model pipeline design and training
- Model inference and audio generation and post-processing
- Speaker for final project presentation
**Features:**
- Integration of HuggingFace sound recognition models
- Implementation of state-of-the-art Diffusion and GAN models
- Self-collected and processed dataset of bird vocalizations
- Interactive Streamlit web interface for generating new bird sounds

**Technologies:**
- Python, PyTorch for model implementation
- Streamlit for web application frontend
- Audio processing libraries (librosa, torchaudio)
- Data collection and preprocessing pipeline

**Challenges & Solutions:**
- **Challenge:** Creating realistic audio outputs with limited training data
- **Solution:** Implemented data augmentation techniques and comprehensive preprocessing methods to improve model performance

**Links:** [GitHub Repository](repo-link) | [Streamlit Web App](webapp-link)

---

### Spotify CLI

![Project Screenshot](screenshot-placeholder-link)

**Overview:**
A command-line interface for Spotify built from scratch in Rust, enabling efficient daily music management without leaving the terminal.

**Features:**
- Search for songs, artists, and albums directly from terminal
- Add and remove songs from playlists
- Playback controls (play, pause, skip, rewind)
- User authentication with Spotify API
- Persistent session management

**Technologies:**
- Rust programming language
- Spotify Web API integration
- Token-based authentication
- Terminal UI libraries
- Async operations for responsive experience

**Challenges & Solutions:**
- **Challenge:** Managing OAuth token refresh while maintaining a smooth user experience
- **Solution:** Implemented background token refresh mechanism with intelligent error handling

**Links:** [GitHub Repository](repo-link)

---

### Slapjack Card Game

![Project Screenshot](screenshot-placeholder-link)

**Overview:**
Designed and implemented a digital version of the Slapjack card game on dual FPGA boards, 
demonstrating hardware design skills and real-time systems development. This project combined low-level hardware programming with game theory implementation.

**Features:**
- Fully synchronized multiplayer gameplay across two FPGA boards using custom protocols
- Four difficulty levels with adaptive AI opponents
- Dynamic LED display showing game state, scores, and turn indicators
- Custom 8-bit music synthesizer with multiple background tracks
- State machine architecture for game logic implementation

**Technologies:**
- SystemVerilog HDL for core game logic and state machines
- Xilinx Vivado for synthesis and implementation
- VGA controller for graphical output (640x480 resolution)
- Python with librosa for converting audio samples to FPGA-compatible format

**Challenges & Solutions:**
- **Challenge:** Limited memory and processing power on FPGA boards
  - **Solution:** Implemented a shared memory architecture by establishing direct connectivity between the two FPGA boards, allowing seamless access to game state data without redundant storage or complex synchronization protocols

**Links:** [GitHub Repository](repo-link) | [Demo Video](video-link)

