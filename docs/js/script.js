console.log('hello')

// --------------------- getting the required elements ---------------------- //

const voiceSelector = document.querySelector('select');
const textArea = document.querySelector('textarea');
const speechBtn = document.querySelector('button');

let synth = speechSynthesis;
isSpeaking = true

// -------------- Creating function selection and tag for select--------------------------------------//

voices()

function voices() {
    for( let voice of synth.getVoices()) {
        // Selecting voice as default // 
        let selected = voice.name === 'Microsoft Maria - Portuguese (Brazil) (pt-BR)' ? "selected" : ""; 
        // creating an option tag with passing voice name and voice language  
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceSelector.insertAdjacentHTML("beforeend", option) //inserting option tag beforeend of select 

    }
}

synth.addEventListener("voiceschanged", voices )

// -------------------------- function textToSpeech -------------------------------- //

function textToSpeech(text) {

    let utternance = new SpeechSynthesisUtterance(text)
    // if the available device voice is equal  to the user selected voice name 
    // then set the speech  voice to the user selected voice 
    for ( let voice of synth.getVoices()) {
        if(voice.name === voiceSelector.value) {
            utternance.voice = voice;
        }
    } 
    synth.speak(utternance); //Speak the speech/utternance//


}


// ------- e.preventDefault to avoid submit, if textarea isn´t empty, trigger textToSpeech function ----- //

speechBtn.addEventListener('click', e => {

    e.preventDefault();
    if (textArea.value !== "") {
        if(!synth.speaking) { // if an utternance/speech is not currently in the process of speaking 
        textToSpeech(textArea.value);
        }  
        if(textArea.value.length > 80) {
            if(isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerHTML = "Pause Speech"
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerHTML = "Resume Speech"
            }
        }
    }

});


// checking is utternance/speech in speaking process or not in every 100ms 
// if not then set the value of isSpeaking to true and change the button text 

setInterval(() => {
    if(!synth.speaking && !isSpeaking) {
        isSpeaking = true; 
        speechBtn.innerHTML = "Convert to Speech"
    } else {
        speechBtn.innerHTML = "Convert to Speech"
    }
});


// Another code area // ☺☺☺☺☻☻☻☻♠○◘•♦♣♠♥☻☺♦♣♠♥☻☺♦♣♠♥☺☺☻♥♠♣♦•◘○♠♣♦☺☻♥
//


