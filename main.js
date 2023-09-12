const inputElement = document.querySelector('.js-input');
const sumbitBtn = document.querySelector('.submit');
const sound = document.querySelector('#sound');

      

        

        function searchWord(){

            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputElement.value}`;
            sound.setAttribute("src", null);

            fetch(apiUrl)
            .then(res => {
                if(!res.ok){
                    throw new Error('Something went wrong')
                }
                return res.json();
            })
            .then((data) => {
                console.log(data)
                document.querySelector('.error').textContent = '';
                document.querySelector('.js-phonetics').innerHTML = '';
                document.querySelector('.js-text').innerHTML = data[0].word;
                document.querySelector('.js-definition').innerHTML = data[0].meanings[0].definitions[0].definition;
                if(data[0].meanings[0].definitions[0].example === undefined){
                    document.querySelector('.js-example').style.display = 'none';
                } else {
                    document.querySelector('.js-example').innerHTML = `Example: ${data[0].meanings[0].definitions[0].example}`;
                }
                if(data[0].phonetic !== undefined){
                    document.querySelector('.js-phonetics').innerHTML = data[0].phonetic;
                }
                
                document.querySelector('.js-play').style.display = 'block';
                inputElement.value = '';

            try {
                let audioSourceFound = false;
                Array.from(data[0].phonetics).forEach(item => {
                    if(item.audio !== ''){
                        sound.setAttribute("src", item.audio);
                        audioSourceFound = true;
                        document.querySelector('.error').textContent = '';
                    } 
                });

                if(!audioSourceFound) {
                    throw new Error('No audio source found for this word.');

                }

                document.querySelector('.js-play').addEventListener('click', () => {
                    sound.play();
                    
                })
               
            }
            catch (error){

                console.error('Error loading audio:', error);

                // Handle audio loading error gracefully
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Sorry, there was an error loading the audio.';
                document.querySelector('.error').appendChild(errorMessage);
        
                // Hide the play button since there's no audio source
                document.querySelector('.js-play').style.display = 'none';
            
            }
                    
                
                
                

            })
        }

        // searchWord();

        sumbitBtn.addEventListener('click',(e) => {
            if(inputElement.value.trim() !== ''){
            searchWord();
            document.querySelector('.js-display-dictionary').style.display = 'block';
            } else {
                alert('Type the word')
            }
            })

        inputElement.addEventListener('keyup', (e) => {
            if(e.key === 'Enter'){
                searchWord();
            }
        })
