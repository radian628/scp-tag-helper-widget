function addRandomizer(tags: string[], name?: string) {
  let tagdisplay: HTMLDivElement | undefined;
  return makeHTMLTree({
    tag: "div",
    style: {
      marginBottom: "10px",
    },
    children: [
      {
        tag: "button",
        innerText: name ?? "NO NAME",
        style: {
          marginRight: "20px",
        },
        onLoad(e) {
          e.addEventListener("click", () => {
            if (tags.length === 0) return;
            const index = Math.floor(Math.random() * tags.length);
            const tag = tags.splice(index, 1);
            // console.log(tags);
            tagdisplay!.innerText += " " + tag[0];
          });
        },
      },
      {
        tag: "div",
        onLoad(e) {
          tagdisplay = e as HTMLDivElement;
        },
      },
    ],
  });
}

for (const [catname, cat] of Object.entries(categories)) {
  let tagdisplay: HTMLDivElement | undefined;
  const tags = cat.sections
    .flatMap((s) => s.items)
    .map((item) => item.name?.replace(/section\./, "") ?? "NO NAME");
  document.body.appendChild(addRandomizer(tags, cat.name));
}

const esoterics =
  `Absentia, Acquiesce, Active, Aegis, Agare, Ain, Aisna, Aizsaule, Alexandrios, Anomalous1, Antiabsentia, Antithesis, Archived, Argus, Asset, Asura, Atlas2, Autocontained, Azathorth, Bakkhos, Belial, Biel, Binah, Blasphemia, Boltzmann, Cernunnos, Chelovek, Chesed, Chhokmah-/-Sapientia3, Concentra, Concealed, Concluded, Consulta, Contained, Continua, Corona, D, Da'aS-Elyon-/-Conscientia4, Dagdagiel, Damballah, Declassified, Deicidium, Dependent, Draugr, Drygioni, Efla, Ein-Sof, Ellipsis, Embla, Endeminis, Enochian, Entos, Eparch, Esoteric/Other, Ether/Aether, Ethical, Eucharistica, Exempt, Extreme, Finis, Flor-Galana, Folio, Geographical, Gevurah, Gleipnir, Gödel, Halcyon, Hariti, Hazardous, Hera, Hiemal, Historia, Ignosi, In-Progress, Inimical, Integrated, Irrelevant, Isis, Israfil, Kalpa, Keytar, Khonsu, Kušum, Legally-Uncontainable, Limot/Ennui, Loptr, Maksur, Malkuth, Megiddo, Memet, Moiety, Multiplex, Mumar, Mushrik, Mutually-Dependent, N/A, Nagi, Necessary, Necropsar, Nepenthe, Netzach, Non-Anomalous, None, Null, Pagnum, Pantokratōr, Passive, Pausa, Petrus, Prima-Facie, Principalis, Prodest, Public, Pudicitia, Radix/Yesod5, RANDOMISED-CLASS-00, Realitätsbrecher, Resolved, Rigoletto, Sampo, Simpatico, Sköll, Skótos, Spiritual, Standard, Starveling, Strife, Symbolic, Tantum, Tempus, Tenebrarius, Terminal, Terminarch, the-simpsons-farting, Thoth, Tiamat, Umbra, Unconfirmed, Uncontainable, Uncontained, Unknown, Unnecessary, Vault, Void, Volitava, Zeno, Zurvan, Ѻмѐга-Титло, abaddon, adviso, alterius, ante, celaris, doctrina, dormi, eschaton, exsequi, flecto, Horizont6, ictus, impetus, nuntii, numen, potissimi, praedico, prodest, provisi, reliquia, samadhi, supernus, truculent, ubique, Location, Object, Phenomenon, Artifact, Audiovisual, Avian, Canine, Crustacean, Digital, Divine, Ectoentropic, Edifice, Event, Extraterrestrial, Geographical, Humanoid, Insectoid, Instrument, Location, Mechanical, Online, Memetic, Parauniversal, Pathogen, Plant, Reality-Alteration, Telepathic, Textual, -Approaching/-Arriving/-Intruding/-Exited, Dark, Eigenweapon, Extreme, K-Archon, (Informal), (Neutralized), Paradox-Apollyon, Paradox-Thaumiel, (Partial), (Provisional), (Unknown), Chaya, Denied, Infrared, Obscurum, Ifrit, Praetorian, Feelazo, Multiple, Erloschen, Micantia, Cyber-Amida, Narrative-Amida, Metamida, Irrelevant, N/A, N/A, Null, Ohr, Paradoxical, Gevurah, Undetermined,-TBD, INFLUENCE, Under-Review, Variable, Systemic, None, Cryptic, Denied, Mercurial, N/A, Multiple, Nus, Severus, Cautela, Tangent, Thanatos, ZK, Vital, Under-Review, VOLATILITY, None, , [ASCI-Classes], [DATA-EXPUNGED], Debated, ERROR, HANDLE_NOT_FOUND, Malchut, [MISSING_DATA], Multiple/See-Below, Not-assigned, #NULL, Placeholder, [REDACTED], Safe, TBD, Test, Unallocated, Under-Review, UNDEFINED, Urgent-reclassification-required., Utmost, Aconcentra, Adventure, Alive, Apologize., At-home,-Bullshit,-??, Azathoth, Bad, Beautiful, BFF, Boundless, CHALLENGE, Containment, Cor, Dark-Keter, Dishwasher, Dream, Echelon, Extant-Non-Extant, fuck, Friend, Foregone, Former, Fluxus, Glorious, GOD, Ideate, In-doubt, Infohazardous-Predator, Iscariot, Joke, Karl-June, Kronecker, Lambda-Gephyra, Mendax, mine, Nehemoth, Oblique, Olympus, Outside, Pure-And-Free,-Blizzard,-apollyon-or-blizzard-or-white-i-don't-even-know-anymore, Robertson-Jackal, Saoshyant, Scarf, SCP-2357-poses-no-danger-to-anyone,-although-it-very-easily-could-have-been-made-that-way., Semel, SERENDIPITYSYZYGY, Sfae, "Shadow's-Crown"-Phenomenon, Simulacra, Sofa-(Liposuction-Majestic), Spiteful-motherfucker, Sunrays,-Muted, Super-Keter, this-is-dado, Thorleyan, Whatever-you-want-it-to-be,-really.-You're-in-charge-here., World-ending?, Youklid, 53, Zenzizenzizenzic, ▄█▐██, █████████, Aicalë, Ain-Soph-Aur, Anesidora, Axiom, Cancelled, Cartel, Compromised, Curious, Cyberism, Daath, Deus-non-vult, Disenchant, Doubtful, Eclosion, Ecophagy, Exist, Exploring, Fifth, Flood, Foundation, Galileo, Golence, HARD, Heimarmene, Hod, Imitec, Infinity, Instrumentum, Interferelessed, Interstella, Jahiliyah, Jerusalem, Juggernaut, Kukalcauan, Lore, Maska, Mendax11, Montipora, Nightfall_Meteor, No, NoNeed, Not-required, Ogiel, Origin, Original, Ѻт, Pistispate, Ƿriðe, Reclaimed, Released, Shahar, Secret, Shrödinger, Sistima13, Socrat, Solved, Suspicion, tainted-witness, To-serve, Trout, Umirajici, Unclassed, Uya, Zwillinge`.split(
    ", "
  );

document.body.appendChild(
  addRandomizer(esoterics, "Esoteric Classes (not a tag)")
);
