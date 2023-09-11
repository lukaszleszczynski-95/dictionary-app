const inputElement = document.querySelector('.js-input');
const sumbitBtn = document.querySelector('.submit');
const sound = document.querySelector('#sound');

      

        

        function searchWord(){
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputElement.value}`;
            sound.setAttribute("src", null);

            fetch(apiUrl)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                document.querySelector('.js-display-dictionary').textContent - '';
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

                Array.from(data[0].phonetics).forEach(item => {
                    if(item.audio !== ''){
                        sound.setAttribute("src", item.audio);
                    } else {
                        console.log('No source')
                    }
                })

                document.querySelector('.js-play').addEventListener('click', () => {
                    sound.play();
                    
                })
                

            })
        }

        // searchWord();

        sumbitBtn.addEventListener('click', searchWord)
