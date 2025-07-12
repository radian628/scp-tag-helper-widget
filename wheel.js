// wheel.ts
var addRandomizer = function(tags, name) {
  let tagdisplay;
  return makeHTMLTree({
    tag: "div",
    style: {
      marginBottom: "10px"
    },
    children: [
      {
        tag: "button",
        innerText: name ?? "NO NAME",
        style: {
          marginRight: "20px"
        },
        onLoad(e) {
          e.addEventListener("click", () => {
            if (tags.length === 0)
              return;
            const index = Math.floor(Math.random() * tags.length);
            const tag = tags.splice(index, 1);
            tagdisplay.innerText += " " + tag[0];
          });
        }
      },
      {
        tag: "div",
        onLoad(e) {
          tagdisplay = e;
        }
      }
    ]
  });
};
for (const [catname, cat] of Object.entries(categories)) {
  let tagdisplay;
  const tags = cat.sections.flatMap((s) => s.items).map((item) => item.name?.replace(/section\./, "") ?? "NO NAME");
  document.body.appendChild(addRandomizer(tags, cat.name));
}
var esoterics = `Absentia, Acquiesce, Active, Aegis, Agare, Ain, Aisna, Aizsaule, Alexandrios, Anomalous1, Antiabsentia, Antithesis, Archived, Argus, Asset, Asura, Atlas2, Autocontained, Azathorth, Bakkhos, Belial, Biel, Binah, Blasphemia, Boltzmann, Cernunnos, Chelovek, Chesed, Chhokmah-/-Sapientia3, Concentra, Concealed, Concluded, Consulta, Contained, Continua, Corona, D, Da'aS-Elyon-/-Conscientia4, Dagdagiel, Damballah, Declassified, Deicidium, Dependent, Draugr, Drygioni, Efla, Ein-Sof, Ellipsis, Embla, Endeminis, Enochian, Entos, Eparch, Esoteric/Other, Ether/Aether, Ethical, Eucharistica, Exempt, Extreme, Finis, Flor-Galana, Folio, Geographical, Gevurah, Gleipnir, G\xF6del, Halcyon, Hariti, Hazardous, Hera, Hiemal, Historia, Ignosi, In-Progress, Inimical, Integrated, Irrelevant, Isis, Israfil, Kalpa, Keytar, Khonsu, Ku\u0161um, Legally-Uncontainable, Limot/Ennui, Loptr, Maksur, Malkuth, Megiddo, Memet, Moiety, Multiplex, Mumar, Mushrik, Mutually-Dependent, N/A, Nagi, Necessary, Necropsar, Nepenthe, Netzach, Non-Anomalous, None, Null, Pagnum, Pantokrat\u014Dr, Passive, Pausa, Petrus, Prima-Facie, Principalis, Prodest, Public, Pudicitia, Radix/Yesod5, RANDOMISED-CLASS-00, Realit\xE4tsbrecher, Resolved, Rigoletto, Sampo, Simpatico, Sk\xF6ll, Sk\xF3tos, Spiritual, Standard, Starveling, Strife, Symbolic, Tantum, Tempus, Tenebrarius, Terminal, Terminarch, the-simpsons-farting, Thoth, Tiamat, Umbra, Unconfirmed, Uncontainable, Uncontained, Unknown, Unnecessary, Vault, Void, Volitava, Zeno, Zurvan, \u047A\u043C\u0450\u0433\u0430-\u0422\u0438\u0442\u043B\u043E, abaddon, adviso, alterius, ante, celaris, doctrina, dormi, eschaton, exsequi, flecto, Horizont6, ictus, impetus, nuntii, numen, potissimi, praedico, prodest, provisi, reliquia, samadhi, supernus, truculent, ubique, Location, Object, Phenomenon, Artifact, Audiovisual, Avian, Canine, Crustacean, Digital, Divine, Ectoentropic, Edifice, Event, Extraterrestrial, Geographical, Humanoid, Insectoid, Instrument, Location, Mechanical, Online, Memetic, Parauniversal, Pathogen, Plant, Reality-Alteration, Telepathic, Textual, -Approaching/-Arriving/-Intruding/-Exited, Dark, Eigenweapon, Extreme, K-Archon, (Informal), (Neutralized), Paradox-Apollyon, Paradox-Thaumiel, (Partial), (Provisional), (Unknown), Chaya, Denied, Infrared, Obscurum, Ifrit, Praetorian, Feelazo, Multiple, Erloschen, Micantia, Cyber-Amida, Narrative-Amida, Metamida, Irrelevant, N/A, N/A, Null, Ohr, Paradoxical, Gevurah, Undetermined,-TBD, INFLUENCE, Under-Review, Variable, Systemic, None, Cryptic, Denied, Mercurial, N/A, Multiple, Nus, Severus, Cautela, Tangent, Thanatos, ZK, Vital, Under-Review, VOLATILITY, None, , [ASCI-Classes], [DATA-EXPUNGED], Debated, ERROR, HANDLE_NOT_FOUND, Malchut, [MISSING_DATA], Multiple/See-Below, Not-assigned, #NULL, Placeholder, [REDACTED], Safe, TBD, Test, Unallocated, Under-Review, UNDEFINED, Urgent-reclassification-required., Utmost, Aconcentra, Adventure, Alive, Apologize., At-home,-Bullshit,-??, Azathoth, Bad, Beautiful, BFF, Boundless, CHALLENGE, Containment, Cor, Dark-Keter, Dishwasher, Dream, Echelon, Extant-Non-Extant, fuck, Friend, Foregone, Former, Fluxus, Glorious, GOD, Ideate, In-doubt, Infohazardous-Predator, Iscariot, Joke, Karl-June, Kronecker, Lambda-Gephyra, Mendax, mine, Nehemoth, Oblique, Olympus, Outside, Pure-And-Free,-Blizzard,-apollyon-or-blizzard-or-white-i-don't-even-know-anymore, Robertson-Jackal, Saoshyant, Scarf, SCP-2357-poses-no-danger-to-anyone,-although-it-very-easily-could-have-been-made-that-way., Semel, SERENDIPITYSYZYGY, Sfae, "Shadow's-Crown"-Phenomenon, Simulacra, Sofa-(Liposuction-Majestic), Spiteful-motherfucker, Sunrays,-Muted, Super-Keter, this-is-dado, Thorleyan, Whatever-you-want-it-to-be,-really.-You're-in-charge-here., World-ending?, Youklid, 53, Zenzizenzizenzic, \u2584\u2588\u2590\u2588\u2588, \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588, Aical\xEB, Ain-Soph-Aur, Anesidora, Axiom, Cancelled, Cartel, Compromised, Curious, Cyberism, Daath, Deus-non-vult, Disenchant, Doubtful, Eclosion, Ecophagy, Exist, Exploring, Fifth, Flood, Foundation, Galileo, Golence, HARD, Heimarmene, Hod, Imitec, Infinity, Instrumentum, Interferelessed, Interstella, Jahiliyah, Jerusalem, Juggernaut, Kukalcauan, Lore, Maska, Mendax11, Montipora, Nightfall_Meteor, No, NoNeed, Not-required, Ogiel, Origin, Original, \u047A\u0442, Pistispate, \u01F7ri\xF0e, Reclaimed, Released, Shahar, Secret, Shr\xF6dinger, Sistima13, Socrat, Solved, Suspicion, tainted-witness, To-serve, Trout, Umirajici, Unclassed, Uya, Zwillinge`.split(", ");
document.body.appendChild(addRandomizer(esoterics, "Esoteric Classes (not a tag)"));
