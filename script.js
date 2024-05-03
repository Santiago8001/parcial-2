async function getData(url){
    try{
        const response= await axios.get(url);
        const data= response.data;
        mg_error.style.display="none";
        return data;
    }
    catch(error){
        console.error(error);
        mg_error.style.display="block";
        show.style.display="none";
        exit;
    }
}
const boton=document.querySelector(".buttonSearch");
const text=document.querySelector("#in1");
const mg_error=document.querySelector(".containerError");
const show=document.querySelector(".containerInfo");
boton.addEventListener(
    "click",
    ()=>{
        const request=text.value;
        console.log(request);
        let url='https://pokeapi.co/api/v2/pokemon/'+request;
        (async() => {
            try{
                const data = await getData(url);
                show.style.display="flex";
                const nombre=data.forms[0].name;
                const pokemon_name=document.querySelector(".pokemonName");
                pokemon_name.textContent=nombre;
                const ability=data.abilities
                let habilidades=""
                for(let i=0; i< ability.length; i++){
                    habilidades=habilidades+ability[i].ability.name+",";
                }
                skills=document.querySelector(".pokemonAbilities");
                skills.textContent=habilidades.slice(0,-1);

                const newurl=data.forms[0].url;
                const data2 = await getData(newurl);
                const tipo=document.querySelector(".pokemonType")
                tipo.textContent=data2.types[0].type.name;

                const img=document.querySelector(".pokemonImg")
                img.setAttribute("src",data.sprites.other["official-artwork"].front_default);
            }
            catch(error){
                console.error(error);
            }
        })();
    }
);