document.getElementById("pokeSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    let value = document.getElementById("poke").value;
    if (value === "")
        value = Math.floor(Math.random() * 932) + 1;
    console.log(value);
    let url = "https://pokeapi.co/api/v2/pokemon/" + value;

    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            var descriptionURL = json.species.url;
            //get the description.
            fetch(descriptionURL)
                .then(function (response2) {
                    return response2.json();
                })
                .then(function (json2) {
                    console.log(json2);
                    let description = "";
                    description += '<h2>' + json.name.toUpperCase() + " #" + json2.id + '</h2>';
                    //get genus
                    for (let i = 0; i < json2.genera.length; ++i) {
                        if (json2.genera[i].language.name == "en") {
                            description += '<h3>' + json2.genera[i].genus + '</h3>'
                        }
                    }
                    //picture of pokemon
                    let sprite = json.sprites.front_default;
                    description += '<img src="' + sprite + '">'

                    //get description in english
                    for (let i = 0; i < json2.flavor_text_entries.length; ++i) {
                        if (json2.flavor_text_entries[i].language.name == "en") {
                            description += '<h3> Description: </h3>';
                            description += "<p>" + json2.flavor_text_entries[i].flavor_text + '</p>';
                            break;
                        }
                    }
                    //typeing
                    description += '<h4> Type: ';
                    for (let i = 0; i < json.types.length; ++i) {
                        description += json.types[i].type.name + " ";
                    }
                    description += '</h4>';
                    //base stats
                    description += '<h4> Base Stats: <br> </h4>';
                    description += '<p>';
                    for (let i = 0; i < json.stats.length; ++i) {
                        description += json.stats[i].stat.name + ": " + json.stats[i].base_stat + '<br>';
                    }
                    description += 'base-happiness: ' + json2.base_happiness;
                    description += '</p>';
                    //abilites 
                    description += '<h4> Abilities: <br> </h4>';
                    description += '<p>';
                    for (let i = 0; i < json.abilities.length; ++i) {
                        description += json.abilities[i].ability.name + '<br>';
                    }
                    description += '</p>';
                    //moves learned by leveling
                    description += '<h4> Moves Learned by Leveling: <br> </h4>';
                    description += '<p>';
                    for (let i = 0; i < json.moves.length; ++i) {
                        if (json.moves[i].version_group_details[0].move_learn_method.name == "level-up") {
                            description += json.moves[i].move.name.bold() + " level learned: " +
                                json.moves[i].version_group_details[0].level_learned_at + '<br>';
                        }
                    }
                    description += '</p>';
                    document.getElementById("pokedexResults").innerHTML = description;
                })
            let url3 = json.location_area_encounters;
            fetch(url3)
                .then(function (response3) {
                    return response3.json();
                })
                .then(function (json3) {
                    let location = "";
                    if (json3.length === 0) {
                        console.log('here');
                        location += "<h3> No Known location. </h3> <br><br>";
                    }
                    else {
                        location += '<h3> Known Locations: </h3>';
                        location += '<p>'
                        for (let i = 0; i < json3.length; ++i){
                            location += json3[i].location_area.name + '<br>';
                        }                
                        location += '</p>';   
                        console.log(location) 
                    }
                    document.getElementById("pokedexLocation").innerHTML = location;
                })
        })


});
