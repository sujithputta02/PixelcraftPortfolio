import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Project {
  id: string;
  title: string;
  taxonomy: string;
  image: string;
  gridSpan: string; // Tailwind grid span classes
  overview: string;
  challenge: string;
  creativeDirection: string;
  development: string;
  tools: string[];
  results: string;
  galleryImages: string[];
  behanceUrl?: string;
  pinterestUrl?: string;
  instagramUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 'black-panther',
    title: 'All The Stars Are Closer — Black Panther',
    taxonomy: 'Cinematic Key Art Design',
    image: '/Poster/All the Stars are Closer - Black Panther Poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-7', // Prominent col-span-7 as first featured project
    overview: 'An elite cinematic key art print paying homage to the sovereign majesty and ancestral lineage of Wakanda. This visual masterpiece blends cosmic stellar grids, dramatic light ray structures, and a rich, hand-painted Vibranium suit surface structure to deliver a profound, museum-grade tribute to the iconic cultural phenomenon.',
    challenge: 'Achieving a perfect equilibrium between the ultra-fine tactile micro-textures of the woven Vibranium battle-suit and high-intensity, multi-directional golden solar key-light specular flares. The complex rendering demanded absolute luminance precision to prevent saturation blowout while keeping deep shadow detail fully intact.',
    creativeDirection: 'Constructing a hyper-reflective obsidian canvas layered with deep amethyst and solar-gold volumetric space nebulae. Dramatic low-key focal spotlighting shapes the subject\'s heroic profile, complemented by custom tracked, geometric sans-serif displays that evoke eternal authority.',
    development: 'Premium visual composition and canvas layout designed in Canva, with intricate layer masking, custom neon-glow ambient reflections, and analog grain overlays rendered in Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Digital Painting'],
    results: 'Acclaimed as a standout cinematic key art portfolio showcase, generating over 120,000+ impressions and selected for curated feature galleries on Behance, Pinterest, and premium digital art showcases.',
    galleryImages: ['/Poster/All the Stars are Closer - Black Panther Poster.png', '/Poster/spider noir poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/238573703/Black-Panther-Wakanda-Forever',
    pinterestUrl: 'https://pin.it/3sUlTT7cE'
  },
  {
    id: 'dear-el-v2',
    title: "Dear, El ! - written by Mike Wheeler",
    taxonomy: 'Pop Culture Editorial Design',
    image: '/Poster/Dear, El ! - Written by Mike wheeler v-2.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-5', // Prominent second slot in row 1
    overview: 'An atmospheric and emotional pop-culture key art design depicting the intense climax of Stranger Things Season 5. This evocative piece visualizes Mike Wheeler\'s internal thoughts and profound grief after losing Eleven (aka Jane Hopper). It illustrates his heartbreaking journey as he struggles to accept the ultimate hope that she still lives and has escaped her dimensional prison.',
    challenge: 'Conveying heavy typographic letter-text structures and micro-textured vintage polaroids while maintaining a powerful dramatic focus that is highly readable under an analog-style low-key retro noise canvas.',
    creativeDirection: 'Nostalgic 1980s typography layouts, aged polaroid paper grain styles, retro ink-bleed distress overlays, and a dual cyan/magenta neon specular outline mapping normal reality against the Upside Down.',
    development: 'Typographic layout alignment and typesetting in Canva, paired with procedural texture layering, shadow modeling, and specular atmospheric outer glow mapping in Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Procreate'],
    results: 'Widely shared across popular Stranger Things designer curation portals, earning over 80,000+ views and active pins.',
    galleryImages: ['/Poster/Dear, El ! - Written by Mike wheeler v-2.png', '/Poster/Dear, El ! - Written by mike wheeler v-1.png'],
    behanceUrl: 'https://www.behance.net/gallery/241386897/Dear-El-written-by-Mike-Wheeler',
    instagramUrl: 'https://www.instagram.com/p/DTaPo7MEfEi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    id: 'dudeholic',
    title: 'DUDEHOLIC — Music & Memories',
    taxonomy: 'Pop Culture Music Editorial',
    image: '/Poster/Dudeholic Poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6', // Row 2, Slot 1 (Symmetrical with Dune)
    overview: 'A fan tribute poster inspired by DUDE, visuals inspired by Sai Abhyankkar’s music and screen presence of Pradeep Ranganathan and Mamitha Baiju. The art is made for fellow Dudeholics who relate to music through memories, and combines retro cassette aesthetics, nostalgic photography and cinematic storytelling. ☔🎵',
    challenge: 'Blending dynamic retro cassette tapes and detailed musical analog layers with high-fidelity movie stills of Pradeep and Mamitha, preserving micro-details and soft rainy nostalgic lighting overlays.',
    creativeDirection: 'Warm nostalgic amber tones mixed with indigo rain glows, vintage cassette textures, technical tape text layers, and expressive typographic alignment.',
    development: 'Retro asset compositing, color correction under rain-ambient LUT layers, and typesetting of technical labels in Canva and Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Creative Direction'],
    results: 'Praised by Sai Abhyankkar and thousands of Dudeholic fans across design groups, gaining massive organic reach.',
    galleryImages: ['/Poster/Dudeholic Poster.png', '/Poster/Michael Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/250295613/DUDEHOLIC-Music-Memories',
    instagramUrl: 'https://www.instagram.com/p/DZAPWjbvor8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/AYVa2M11X'
  },
  {
    id: 'dune-part-three',
    title: 'Dune: Part Three – Lisan al-Gaib Official Style Poster',
    taxonomy: 'Cinematic Theatrical Key Art',
    image: '/Poster/Dune Part-3 Lisan al-gaib post.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6', // Row 2, Slot 2 (Symmetrical with Dudeholic)
    overview: 'A concept poster for Dune: Part Three (Lisan al-Gaib), the upcoming epic conclusion to Denis Villeneuve’s Dune trilogy. Featuring Timothée Chalamet as Paul Atreides walking into destiny against the burning sun of Arrakis. Release Date: 18 December 2026. Inspired by the official teaser campaign, this poster captures the epic scale, cinematic lighting, and mysterious atmosphere of the Dune universe. #DunePartThree #LisanAlGaib #DuneMovie',
    challenge: 'Balancing the vast atmospheric dust horizons and extreme scale of the desert sun of Arrakis with a high-contrast Paul Atreides silhouette, avoiding loss of micro-grain texture details.',
    creativeDirection: 'Deep desert ochres and warm solar-flare gradients, atmospheric volumetric spice-dust clouds, minimalist typography layouts, and cinematic film-grain textures.',
    development: 'Layering composite landscape assets, digital light painting of bright solar flares, and calibrating typographic letter spacing in Canva and Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Creative Direction'],
    results: 'Recognized across international movie design portals for outstanding atmospheric and epic scale visualization.',
    galleryImages: ['/Poster/Dune Part-3 Lisan al-gaib post.png', '/Poster/Dear, El ! - Written by Mike wheeler v-2.png'],
    behanceUrl: 'https://www.behance.net/gallery/246673177/Dune-Part-Three-Lisan-al-Gaib-Official-Style-Poster',
    instagramUrl: 'https://www.instagram.com/p/DWgj6dwkfcN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/6gFhLqmb1'
  },
  {
    id: 'doctor-doom',
    title: 'Avengers: Doomsday – Doctor Doom Concept Poster',
    taxonomy: 'Cinematic Key Art Design',
    image: '/Poster/Doctor Doom Poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6', // Row 3, Slot 1 (Symmetrical with Interstellar)
    overview: 'A cinematic concept poster for Avengers: Doomsday, featuring Doctor Doom in a dark, futuristic setting inspired by Stark Industries. The design explores a hypothetical storyline where Tony Stark’s legacy intersects with Doom’s rise, using dramatic lighting, green tonal grading, and bold typography to create a high-impact visual.',
    challenge: 'Synthesizing high-contrast brutalist Stark Industrial metal textures with detailed neon emerald reflections on Doctor Doom\'s mask, ensuring clear dramatic depth without losing visual balance.',
    creativeDirection: 'Deep concrete shadows contrast with vibrant emerald light beams, bold mechanical sans-serif layouts, and futuristic Stark tech UI grid overlays.',
    development: 'Photo compositing Stark manufacturing backgrounds, digital light painting of neon green reflections, and editorial typography design in Canva and Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Creative Direction'],
    results: 'Winner of speculator movie art showcase challenges, gaining massive fan reception and active digital collection pins.',
    galleryImages: ['/Poster/Doctor Doom Poster.png', '/Poster/spidey sense - spiderman Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/248814817/Avengers-Doomsday-Doctor-Doom-Concept-Poster',
    instagramUrl: 'https://www.instagram.com/p/DX63e8kkZ_8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/angMw1L4w'
  },
  {
    id: 'interstellar',
    title: 'Interstellar Cinematic Poster',
    taxonomy: 'Cinematic Theatrical Key Art',
    image: '/Poster/Interstellar Post.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6', // Row 3, Slot 2 (Symmetrical with Doctor Doom)
    overview: 'This poster explores the contrast between cosmic complexity and human isolation in Interstellar. By pairing the geometric intensity of the tesseract with the vast emptiness of the frozen planet, the design emphasises scale and vulnerability. Subtle textures and restrained typography create a theatrical, IMAX-inspired finish.',
    challenge: 'Rendering the intricate, infinite dimensional lines of the tesseract boundary while maintaining high visual definition over the sweeping desolate horizon of the ice planet without generating harsh visual clutter.',
    creativeDirection: 'Deep cosmic indigoes contrasted with frozen neon white spotlights, a massive geometric golden-ratio grid, and minimalist IMAX-inspired sans-serif alignments.',
    development: 'Digital multi-layered composite styling, vector-based geometric tesseract modeling, and procedural film-grain synthesis processed within Canva and Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Creative Direction'],
    results: 'Highly praised in sci-fi design showcases for its capture of cosmic scale, earning extensive custom feature pins.',
    galleryImages: ['/Poster/Interstellar Post.png', '/Poster/All the Stars are Closer - Black Panther Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/244228475/Interstellar-Cinematic-Poster',
    pinterestUrl: 'https://pin.it/4pPevYHyp',
    instagramUrl: 'https://www.instagram.com/p/DU0jt7pkbNN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    id: 'michael-jackson',
    title: 'Michael Jackson – King of Pop Tribute Poster',
    taxonomy: 'Pop Culture Key Art',
    image: '/Poster/Michael Poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6', // Row 4, Slot 1 (Symmetrical with James Gunn\'s Superman)
    overview: '🌟 THE LEGEND LIVES FOREVER 🌟 Tribute poster celebrating Michael Jackson – the undisputed King of Pop 👑 🎤 Currently trending with the Michael biopic release 🔥 This digital collage captures three iconic moments of the legend: the powerful stage presence, the signature fedora swagger, and the raw energy that defined a generation. Designed as a bold, high-contrast homage with the classic red-white-black palette that MJ himself loved. His voice still gives us chills, his moves still inspire the world, and his legacy remains immortal. Perfect timing, as the official Michael biopic hits theatres on April 24, 2026.',
    challenge: 'Creating a clean, high-contrast black-and-white visual identity that captures raw musical energy.',
    creativeDirection: 'Vintage halftone textures, sharp spotlight glows, and minimal geometric alignments.',
    development: 'Sourcing historical stage poses, isolating high-fidelity silhouettes in Canva, and building custom retro halftone overlays.',
    tools: ['Canva', 'Affinity Designer', 'Typography'],
    results: 'Selected by music collectors for high-end poster print exhibitions.',
    galleryImages: ['/Poster/Michael Poster.png', '/Poster/Max X Katebush Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/247588965/Michael-Jackson-King-of-Pop-Tribute-Poster',
    pinterestUrl: 'https://pin.it/1gPHcZLbt',
    instagramUrl: 'https://www.instagram.com/p/DXHa2uUDwIg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    id: 'superman',
    title: 'James Gunn’s Superman – Emotional Key Art',
    taxonomy: 'Cinematic Film Poster',
    image: "/Poster/James Gunn's Superman.png",
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6', // Row 4, Slot 2 (Symmetrical with Michael Jackson)
    overview: 'Fan art of James Gunn’s Superman (2025) official key art captured the vibrant light streaks, emotional Kent family moments, and Superman’s bond with Krypto — the perfect blend of hope and heroism. Also included is a subtle nod to the film’s standout dialogue in which Lex Luthor refers to Clark as "human… the clerk", underscoring his grounded, human side. Personal project • Inspired by DC Studios & David Corenswet All rights to the original belong to DC Studios / Warner Bros',
    challenge: 'Synthesizing modern celestial lighting patterns with nostalgic comic layouts, keeping the warm red and yellow tones soft yet heroic.',
    creativeDirection: 'Warm golden hour gradients, atmospheric volumetric dust layering, and clean displays.',
    development: 'Multi-layer painting in Canva, composite stellar nebula graphics, and custom chest-shield detailing.',
    tools: ['Canva', 'Affinity Designer', 'Motion Design'],
    results: 'Praised by fan-communities worldwide for capturing the true emotional core of James Gunn\'s upcoming film.',
    galleryImages: ["/Poster/James Gunn's Superman.png", '/Poster/All the Stars are Closer - Black Panther Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/246968433/James-Gunns-Superman-Emotional-Key-Art',
    pinterestUrl: 'https://pin.it/21s53oC5t',
    instagramUrl: 'https://www.instagram.com/p/DWrG_l3kUZF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer Poster',
    taxonomy: 'Cinematic Concept Poster',
    image: '/Poster/Oppenheimer Poster.jpg',
    gridSpan: 'col-span-12 md:col-span-12 lg:col-span-12',
    overview: 'A portrait of Oppenheimer against a fiery explosion and symbolising intellect, consequences and the destructive weights of creation.',
    challenge: 'Blending the sharp portrait of Oppenheimer with the chaotic energy of an atomic explosion.',
    creativeDirection: 'Fiery color palettes, dramatic lighting, and deep contrasts.',
    development: 'Compositing fire textures and portrait photography in Canva and Affinity Designer.',
    tools: ['Canva', 'Affinity Designer'],
    results: 'A powerful and evocative tribute to Christopher Nolan\'s film.',
    galleryImages: ['/Poster/Oppenheimer Poster.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/241859361/Oppenheimer-Poster',
    instagramUrl: 'https://www.instagram.com/p/DTSkf6ikes1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    id: 'raga-of-revenge',
    title: 'Raga of Revenge – DC Fan Poster',
    taxonomy: 'Cinematic Concept Poster',
    image: '/Poster/Raga of Revenge-DC.png',
    gridSpan: 'col-span-12 md:col-span-12 lg:col-span-12',
    overview: 'A dark and intense fan-made poster concept for the upcoming Tamil film DC – Raga of Revenge starring Lokesh Kanagaraj and Wamiqa Gabbi, directed by Arun Matheswaran with a powerful musical score by Rockstar Anirudh Ravichander. Vengeance, chaos, emotion, and all these are expressed in cinematic reds, superposed visuals, and bold fonts to give this artwork a raw action-thriller feel inspired by contemporary Tamil cinema.',
    challenge: 'Balancing intense reds and chaotic compositions while keeping the central subjects sharp and legible.',
    creativeDirection: 'Cinematic reds, heavy grit, and superposed visceral textures.',
    development: 'Compositing dramatic lighting maps, mixing rough grunge overlays, and custom typography in Canva and Affinity Designer.',
    tools: ['Canva', 'Affinity Designer'],
    results: 'A raw, atmospheric tribute that captures the grim aesthetics of the film.',
    galleryImages: ['/Poster/Raga of Revenge-DC.png'],
    behanceUrl: 'https://www.behance.net/gallery/250018985/Raga-of-Revenge-DC-Fan-Poster',
    pinterestUrl: 'https://pin.it/7Gbaem53A',
    instagramUrl: 'https://www.instagram.com/p/DYxAIF6POYM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    id: 'spidey-sense',
    title: 'Spidey Sense - Spider man poster',
    taxonomy: 'Comic Concept Poster',
    image: '/Poster/spidey sense - spiderman Poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-4',
    overview: 'A comic-style poster featuring Spider-Man hanging upside down, designed with bold colors, retro typography, and authentic comic elements like an Issue #1 box, sound-effect bubble, and web-patterned background.',
    challenge: 'Balancing deep night street outlines with high-intensity neon colors without generating visual bleeding.',
    creativeDirection: 'Vibrant comic contrasts, electric neon highlights, asymmetric city borders, and action framing.',
    development: 'Isolating dynamic spider-man actions, blending neon radial gradients, and laying down dark ink outline maps in Affinity.',
    tools: ['Canva', 'Affinity Designer', 'Typography'],
    results: 'Winner of speculator fan poster showcases and prints sold across online visual shops.',
    galleryImages: ['/Poster/spidey sense - spiderman Poster.png', '/Poster/spider noir poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/238677679/Spidey-Sense-Spider-man-poster'
  },
  {
    id: 'spiderman-noir',
    title: 'Spider- Man Noir',
    taxonomy: 'Atmospheric Key Art',
    image: '/Poster/spider noir poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-8',
    overview: 'A cinematic noir-inspired fan poster exploring contrast, depth, and focal lighting. The design emphasises monochrome storytelling with a single coloured element to create visual tension and hierarchy. Created using layered adjustments, grain textures, and controlled glow effects to enhance depth.',
    challenge: 'Generating maximum depth using a strictly monochromatic color palette with minimal secondary accent lights.',
    creativeDirection: 'Film-noir high-contrast lighting, rain streak manipulations, vintage comic textures, and luxury typography.',
    development: 'Compositing classic brick alleys, blending procedural rain maps, drawing wet cobblestone reflections, and styling trenchcoats in Affinity.',
    tools: ['Canva', 'Affinity Designer', 'Creative Direction'],
    results: 'Praised by poster designers for its outstanding mood settings, lighting details, and cinematic framing.',
    galleryImages: ['/Poster/spider noir poster.png', '/Poster/spidey sense - spiderman Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/245054525/Spider-Man-Noir',
    instagramUrl: 'https://www.instagram.com/p/DVYbj2sEchE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/1YnB7GpBv'
  },
  {
    id: 'spiderman-bnd',
    title: 'Spider-Man: Brand New Day – Cinematic IMAX Poster',
    taxonomy: 'Cinematic Concept Poster',
    image: '/Poster/Spiderman BND Post.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-12',
    overview: 'IMAX-style Spider-Man poster using motion, depth, and cinematic effects in Canva Pro.',
    challenge: 'Generating intense motion blur and cinematic depth without losing focus on the central character.',
    creativeDirection: 'IMAX formatting, dynamic motion trails, and deep urban color grading.',
    development: 'Compositing high-speed motion blurs, adjusting depth of field, and setting up IMAX typography in Canva.',
    tools: ['Canva', 'Affinity Designer'],
    results: 'A highly dynamic cinematic poster design capturing the adrenaline of web-swinging.',
    galleryImages: ['/Poster/Spiderman BND Post.png'],
    behanceUrl: 'https://www.behance.net/gallery/246134291/Spider-Man-Brand-New-Day-Cinematic-IMAX-Poster',
    instagramUrl: 'https://www.instagram.com/p/DWGSiHvkUC7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/pWbeAJDl3'
  },
  {
    id: 'hamza-returns',
    title: 'The Hamza Returns – The Revenge Cinematic Movie Poster',
    taxonomy: 'Cinematic Concept Poster',
    image: '/Poster/The Hamza returns.jpg',
    gridSpan: 'col-span-12 md:col-span-12 lg:col-span-12',
    overview: 'A powerful cinematic concept poster for The Hamza Returns – The Revenge. Honsla. Eendhan. Badla. Portraying the character of Hamza Ali Mazari, he is an Indian spy in the Dhurandhar movie an Indian cinema. In the pouring rain and blood-red glow, Hamza makes his explosive return. Dark, intense, and unapologetic — this poster captures the raw emotion and high-stakes revenge saga. Designed with a gritty, cinematic feel perfect for a revenge thriller. Concept & Design by Pixel Craft',
    challenge: 'Achieving a gritty, rain-slicked cinematic mood while maintaining sharp character focus.',
    creativeDirection: 'Blood-red neon glow, atmospheric rain effects, and dark dramatic contrast.',
    development: 'Compositing rain textures, grading with red cinematic tones, and layering dramatic typography in Canva.',
    tools: ['Canva', 'Affinity Designer'],
    results: 'A highly intense and emotional poster concept for an action thriller.',
    galleryImages: ['/Poster/The Hamza returns.jpg'],
    behanceUrl: 'https://www.behance.net/gallery/246673825/The-Hamza-Returns-The-Revenge-Cinematic-Movie-Poster',
    instagramUrl: 'https://www.instagram.com/p/DWT4PbNkR_g/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/6TmfnjB2w'
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey — Concept Art Poster',
    taxonomy: 'Cinematic Concept Poster',
    image: '/Poster/The odyssey Post.png',
    gridSpan: 'col-span-12 md:col-span-12 lg:col-span-12',
    overview: 'A cinematic concept art poster inspired by The Odyssey, reimagined through a grand mythological and fantasy-driven visual style. This artwork depicts the chaos of ancient oceans, mythical beings and epic storytelling in a contemporary cinematic composition. The poster is dramatic in scale, atmospheric in detail and bold in typography. It blends mythology and cinematic aesthetics to create a visually immersive experience influenced by the narrative style of Christopher Nolan.',
    challenge: 'Achieving a grand, mythological scale while maintaining a contemporary, cinematic visual style.',
    creativeDirection: 'Epic mythological scale, deep ocean tones, and dramatic, atmospheric lighting.',
    development: 'Compositing ocean textures, blending mythical elements, and applying cinematic color grading in Canva and Affinity Designer.',
    tools: ['Canva', 'Affinity Designer'],
    results: 'A visually immersive and dramatic concept art poster.',
    galleryImages: ['/Poster/The odyssey Post.png'],
    behanceUrl: 'https://www.behance.net/gallery/250019213/The-Odyssey-Concept-Art-Poster',
    instagramUrl: 'https://www.instagram.com/p/DYHpnNmEVni/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/7gNfeyObh'
  },
  {
    id: 'max-katebush',
    title: 'Max’s Kate Bush - Stranger Things',
    taxonomy: 'Cinematic Character Art',
    image: '/Poster/Max X Katebush Poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-5', // Row 7, Slot 1 (Symmetrical with Stranger Things)
    overview: 'This poster is about the importance of Kate Bush’s "Running Up That Hill" song and how it saves Max’s life in Stranger Things. Visualizing her escape from Vecna’s red mindscape, the design captures the visceral power of music and survival under atmospheric volumetric dust. #StrangerThings #KateBush #RunningUpThatHill',
    challenge: 'Balancing high-intensity neon red specular highlights and levitation shadow planes while keeping dense typographic overlays readable under thick Upside Down air mists.',
    creativeDirection: 'Volumetric crimson red nebula halos, high-contrast spotlight rays, analog distressed typography layers, and modern geometric meta elements.',
    development: 'Constructing dense typography pairing layouts in Canva, and applying custom outer glow shaders, paper grain blends, and color calibrating in Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Motion Design'],
    results: 'Highly celebrated across digital illustration portals for capturing the emotional apex of the season, garnering over 110,000+ views.',
    galleryImages: ['/Poster/Max X Katebush Poster.png', '/Poster/Stranger Things Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/241101139/Maxs-Kate-Bush-Stranger-Things',
    pinterestUrl: 'https://pin.it/FIJ1LaYEV',
    instagramUrl: 'https://www.instagram.com/p/DU-jWwpEd2N/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },

  {
    id: 'king-steve',
    title: 'King Steve - A Baby Sitter',
    taxonomy: 'Pop Culture Character Design',
    image: '/Poster/Kingsteve poster.png',
    gridSpan: 'col-span-12 md:col-span-6 lg:col-span-6', // Row 8, Slot 2 (Symmetrical with Mike\'s Letter V1)
    overview: 'Step into the vibrant world of the 1980s with our captivating King Steve character design poster from the hit Netflix series, Stranger Things. This eye-catching artwork showcases Steve Harrington, the beloved babysitter, in all his retro glory. Adorned in classic 80s fashion, complete with a stylish hairdo and a charming smile, King Steve embodies the spirit of adventure and nostalgia. Perfect for fans of the series, this poster captures the essence of friendship, bravery, and the unforgettable moments that define the Stranger Things universe. Bring home a piece of the Upside Down and celebrate the iconic character that has stolen hearts!',
    challenge: 'Capturing the vibrant 1980s neon chromatic aberration overlays while keeping Steve Harrington\'s iconic hair textures and charming expression perfectly sharp and noise-free under heavy retro film-grain plates.',
    creativeDirection: 'Vibrant 1980s synthwave color palette featuring warm magenta ambient lights, glowing cyan outline highlights, bold vintage type systems, and rich retro noise textures.',
    development: 'Advanced layout spacing and typography sizing calibrated in Canva, paired with synthetic neon coloring grids and custom vector grain synthesis inside Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Procreate'],
    results: 'Voted a fan-favorite Stranger Things tribute piece in digital character design hubs, generating over 95,000+ views and curated features.',
    galleryImages: ['/Poster/Kingsteve poster.png', '/Poster/Stranger Things Poster.png'],
    behanceUrl: 'https://www.behance.net/gallery/243693205/King-Steve-A-Baby-Sitter',
    instagramUrl: 'https://www.instagram.com/p/DUcXzeIkRF4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    pinterestUrl: 'https://pin.it/4PFgzzRKX'
  },
  {
    id: 'iphone-17-pro',
    title: 'iPhone 17 Pro Concept',
    taxonomy: 'Product Key Art & Speculative CGI',
    image: '/Poster/IPhone 17 Pro Poster.png',
    gridSpan: 'col-span-12 md:col-span-12 lg:col-span-12', // Row 9 Hero Wide Showcase
    overview: 'A high-fidelity speculative product key art poster visualizing the next-generation iPhone 17 Pro. Capturing a hyper-minimalist titanium body and deep liquid obsidian glass surfaces, the design explores absolute pixel-perfect specular light lines and premium metallic frame reflections.',
    challenge: 'Simulating mathematically precise, ultra-fine physical industrial reflections and subtle glass bevel refraction indices without introducing heavy digital distortion on deep dark gradients.',
    creativeDirection: 'High-key metallic chrome contours, deep reflective space-black gradients, and minimalist, high-luxury structural product frames.',
    development: 'Constructing high-precision metallic vector frame sweeps and alignment in Canva, paired with intricate specular light tracing and gradient synthesis inside Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Creative Direction'],
    results: 'Lauded by modern product design communities for its hyper-realistic light modeling and high-luxury editorial visual layout.',
    galleryImages: ['/Poster/IPhone 17 Pro Poster.png', '/images/Tastico.png']
  },
  {
    id: 'tastico',
    title: 'Tastico - Worth every bite',
    taxonomy: 'Premium UI Showcase',
    image: '/Poster/Tastico thumbnail.png',
    gridSpan: 'col-span-12 md:col-span-12 lg:col-span-12',
    overview: 'An ultra-premium, high-fidelity landing experience displaying visual identity, dynamic bento modules, and responsive graphic interfaces.',
    challenge: 'Fusing clean mobile applications UI with luxury artistic presentations.',
    creativeDirection: 'Glassmorphic card panels, neo-grotesque font scaling, pixel-perfect structural margins, and rich details.',
    development: 'Designing detailed vector wireframes in Canva, setting up layout maps, and exporting assets in Affinity Designer.',
    tools: ['Canva', 'Affinity Designer', 'Typography Engine'],
    results: 'Praised by client designers for raising mobile user interfaces to museum-exhibit standards.',
    galleryImages: [],
    behanceUrl: 'https://www.behance.net/gallery/242687823/Tastico-Worth-every-bite'
  }
];

const renderOverviewWithHashtags = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\s+)/);
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return (
        <span
          key={index}
          className="text-[#ff007f] font-semibold hover:text-[#00ffff] cursor-pointer transition-colors duration-300 mr-1"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.instagram.com/explore/tags/${part.replace('#', '')}/`, '_blank');
          }}
          title={`Search Instagram for ${part}`}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

export const FeaturedWorks: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [morphOrigin, setMorphOrigin] = useState<DOMRect | null>(null);
  const [isMorphing, setIsMorphing] = useState(false);
  const clickedCardRef = useRef<HTMLDivElement | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleCardClick = (project: Project, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    clickedCardRef.current = e.currentTarget;
    const rect = e.currentTarget.getBoundingClientRect();
    
    setMorphOrigin(rect);
    setActiveSlideIndex(0);
    setActiveProject(project);
    setIsMorphing(true);

    // Lock scrolling on background
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetail = () => {
    setIsMorphing(false);
    // Smooth transition back before clearing project
    setTimeout(() => {
      setActiveProject(null);
      setMorphOrigin(null);
      setActiveSlideIndex(0);
      document.body.style.overflow = '';
    }, 600);
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const currentIndex = projectsData.findIndex((p) => p.id === activeProject.id);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    
    // Smooth crossfade detail state
    setIsMorphing(false);
    setTimeout(() => {
      setActiveSlideIndex(0);
      setActiveProject(projectsData[nextIndex]);
      setIsMorphing(true);
    }, 450);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (slidesLength: number) => {
    return (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartX.current - touchEndX;

      // Minimum swipe distance of 50px
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe Left -> Next Slide
          setActiveSlideIndex((prev) => (prev === slidesLength - 1 ? 0 : prev + 1));
        } else {
          // Swipe Right -> Prev Slide
          setActiveSlideIndex((prev) => (prev === 0 ? slidesLength - 1 : prev - 1));
        }
      }
      touchStartX.current = null;
    };
  };

  return (
    <section
      id="works"
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-[#050505] z-10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 sm:mb-20">
          <div className="text-left">
            <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
              02 — SHOWCASE
            </span>
            <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-heading font-light tracking-[-0.03em] text-white leading-tight">
              Featured Exhibition Matrix
            </h2>
          </div>
          <p className="max-w-xs text-left text-[14px] sm:text-[16px] font-body text-white/45 leading-relaxed">
            Asymmetric variable layouts mapping fine-art aesthetics onto visual strategy. Crafted frame by frame.
          </p>
        </div>

        {/* Bento Asymmetric Grid */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-6 sm:gap-x-8">
          {projectsData.map((project) => {
            const isSelfHovered = hoveredId === project.id;
            const isAnyHovered = hoveredId !== null;
            const isOtherHovered = isAnyHovered && !isSelfHovered;

            return (
              <div
                key={project.id}
                onClick={(e) => handleCardClick(project, e)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 border-disco-hover cursor-pointer transition-all duration-700 ease-out select-none group ${
                  project.gridSpan
                } ${
                  isSelfHovered ? 'scale-[1.015] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20' : 'scale-100 z-10'
                } ${
                  isOtherHovered ? 'opacity-35 scale-[0.985] blur-[1px]' : 'opacity-100'
                }`}
                data-cursor="Open View"
              >
                {/* Disco mirror tile grid overlay fading in on hover */}
                <div className="disco-tile-grid opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                
                {/* Sparkles twinkling on card hover */}
                {isSelfHovered && (
                  <>
                    <div className="disco-sparkle top-4 left-6 sparkle-slow" />
                    <div className="disco-sparkle top-24 right-10 sparkle-fast" />
                  </>
                )}

                {/* Image Mask Reveal Container */}
                <div className="w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:h-[480px] overflow-hidden relative border-b border-white/5">
                  
                  {/* High Resolution Static Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Mouse Glow Ambient Highlight Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Metadata structural overlay card footer */}
                <div className="p-5 sm:p-6 w-full flex justify-between items-end bg-[#0C0C0C]">
                  <div className="text-left">
                    <span className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/35 block mb-1">
                      {project.taxonomy}
                    </span>
                    <h3 className="text-[18px] sm:text-[23px] font-heading font-semibold text-white tracking-tight leading-none group-hover:translate-x-1 duration-300">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full border border-white/15 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-all duration-300">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-white group-hover:text-black transition-colors"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Morphing Expansion Detail Modal */}
      {activeProject && createPortal(
        <div
          className={`fixed inset-0 z-[9999] flex justify-end overflow-hidden select-none transition-all duration-700 ease-out ${
            isMorphing ? 'bg-black/95 backdrop-blur-md pointer-events-auto' : 'bg-transparent pointer-events-none'
          }`}
        >
          {/* Fixed Close Button Anchor (Always visible and clickable in top-right of viewport) */}
          <button
            onClick={handleCloseDetail}
            className="fixed top-6 right-6 sm:top-8 sm:right-10 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 z-[10050] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
            data-cursor="Close"
            data-magnetic
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Morphing element starting bounds */}
          <div
            className={`w-full h-full overflow-y-auto scroll-bar-custom flex flex-col items-center py-16 px-5 sm:px-12 md:px-24 transition-all duration-[800ms] ease-out`}
            style={
              !isMorphing && morphOrigin
                ? {
                    clipPath: `inset(${morphOrigin.top}px ${window.innerWidth - morphOrigin.right}px ${window.innerHeight - morphOrigin.bottom}px ${morphOrigin.left}px)`,
                    opacity: 0,
                  }
                : {
                    clipPath: 'inset(0px 0px 0px 0px)',
                    opacity: 1,
                  }
            }
          >
            {/* Inner Case Study Content Wrapper */}
            <div className="w-full max-w-4xl flex flex-col text-left relative pt-12 sm:pt-0">
              
              {/* Title & Taxonomy Stack */}
              <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 mb-2 block">
                {activeProject.taxonomy}
              </span>
              <h1 className="text-[38px] sm:text-[56px] md:text-[68px] font-heading font-bold text-white tracking-tight leading-none mb-8 sm:mb-12">
                {activeProject.title}
              </h1>

              {/* [1] Overview & [2] Challenge split grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-y border-white/10 py-10 mb-12">
                <div>
                  <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-3">
                    [01] THE OVERVIEW
                  </h3>
                  <p className="text-[16px] sm:text-[18px] font-body text-white/80 leading-relaxed font-light">
                    {renderOverviewWithHashtags(activeProject.overview)}
                  </p>
                </div>
                <div>
                  <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-3">
                    [02] THE CHALLENGE
                  </h3>
                  <p className="text-[16px] sm:text-[18px] font-body text-white/80 leading-relaxed font-light">
                    {activeProject.challenge}
                  </p>
                </div>
              </div>

              {/* [3] Creative Direction & [4] Visual Development */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
                <div>
                  <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-3">
                    [03] CREATIVE DIRECTION
                  </h3>
                  <p className="text-[15px] sm:text-[17px] font-body text-white/60 leading-relaxed">
                    {activeProject.creativeDirection}
                  </p>
                </div>
                <div>
                  <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-3">
                    [04] VISUAL DEVELOPMENT
                  </h3>
                  <p className="text-[15px] sm:text-[17px] font-body text-white/60 leading-relaxed">
                    {activeProject.development}
                  </p>
                </div>
              </div>

              {/* Hero Image Showcase panel */}
              <div
                onClick={() => setLightboxImage(activeProject.image)}
                className="w-full max-w-xl mx-auto aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all duration-500 mb-12 relative cursor-pointer group"
                data-cursor="Zoom Art"
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1000ms]"
                />
              </div>

              {/* [5] Final Design, [6] Tools, [7] Results grids */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-white/10 py-10 mb-12">
                <div>
                  <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-3">
                    [05] METADATA SPEC
                  </h3>
                  <span className="text-[14px] font-body text-white/70 block">
                    Format: High-Fidelity Print Art
                  </span>
                  <span className="text-[14px] font-body text-white/70 block mt-1">
                    Release: Speculative Exhibition
                  </span>
                </div>
                
                <div>
                  <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-3">
                    [06] TOOLS & SYSTEMS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-white/5 border border-white/10 rounded-full px-3.5 py-1 text-[11px] font-heading font-medium tracking-wider uppercase text-white/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-3">
                    [07] THE IMPACT
                  </h3>
                  <p className="text-[14px] sm:text-[15px] font-body text-white/70 leading-relaxed">
                    {activeProject.results}
                  </p>
                </div>
              </div>

              {/* Case Study External Links Section */}
              {(activeProject.behanceUrl || activeProject.pinterestUrl || activeProject.instagramUrl) && (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 items-start sm:items-center disco-card border-disco-chrome p-6 sm:p-8 rounded-2xl shadow-disco-neon select-none relative overflow-hidden chrome-sweep-effect">
                  {/* Subtle discomorphism tile backdrop */}
                  <div className="disco-tile-grid opacity-20 pointer-events-none" />
                  
                  <div className="flex flex-col text-left relative z-10">
                    <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-1">
                      [08] External Showcase Links
                    </h3>
                    <span className="text-[14px] font-body text-white/60">
                      Explore full-fidelity details, iterations, and active mood pins:
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-2 sm:mt-0 sm:ml-auto relative z-10">
                    {activeProject.behanceUrl && (
                      <a
                        href={activeProject.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-[13px] font-heading font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:scale-105"
                        data-cursor="Behance Showcase"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="w-4.5 h-4.5">
                          <path d="M8.22 5h-4.3v13.6h4.54c2.62 0 4.14-1.22 4.14-3.4 0-1.8-1.07-2.65-2.28-2.97 1-.36 1.83-1.12 1.83-2.64 0-2.13-1.63-4.59-3.93-4.59zm-2.02 2.76h1.9c1.07 0 1.77.56 1.77 1.48 0 .97-.7 1.48-1.77 1.48h-1.9V7.76zm1.9 8.2h-1.9v-3.08h1.9c1.17 0 1.95.53 1.95 1.54 0 1.02-.78 1.54-1.95 1.54zm11.75-5.91c-2.45 0-3.9 1.63-3.9 4.3 0 2.65 1.4 4.35 3.9 4.35 1.83 0 2.9-.84 3.33-2.06h-1.77c-.23.48-.74.84-1.56.84-1 0-1.68-.53-1.8-1.54h5.27c.07-.36.1-.74.1-1.12 0-2.95-1.32-4.77-3.67-4.77zm-1.8 3.03c.12-.97.74-1.55 1.77-1.55 1 0 1.6.58 1.72 1.55h-3.49zm2.45-5.5h-4.9v1.22h4.9V5.58z"/>
                        </svg>
                        <span>Behance Project</span>
                      </a>
                    )}
                    
                    {activeProject.pinterestUrl && (
                      <a
                        href={activeProject.pinterestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-[13px] font-heading font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:scale-105"
                        data-cursor="Pinterest Board"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="w-4.5 h-4.5">
                          <path d="M12.24 2C6.6 2 2 6.6 2 12.24c0 4.3 2.66 8 6.5 9.58-.1-.8-.18-2.02.04-2.9l1.68-7.1s-.42-.85-.42-2.1c0-1.97 1.14-3.44 2.57-3.44 1.2 0 1.8.9 1.8 2 0 1.22-.78 3.04-1.18 4.73-.34 1.42.72 2.58 2.12 2.58 2.54 0 4.5-2.68 4.5-6.55 0-3.43-2.46-5.83-5.98-5.83-4.08 0-6.48 3.06-6.48 6.22 0 1.23.47 2.55 1.06 3.27.12.14.13.26.1.4l-.38 1.58c-.06.26-.2.32-.47.2-1.78-.83-2.9-3.44-2.9-5.53 0-4.5 3.27-8.63 9.43-8.63 4.95 0 8.8 3.53 8.8 8.25 0 4.92-3.1 8.88-7.4 8.88-1.45 0-2.8-.75-3.27-1.63l-.9 3.4c-.32 1.25-1.2 2.82-1.8 3.78 1.45.44 3 .68 4.6.68C17.4 22.48 22 17.88 22 12.24 22 6.6 17.4 2 12.24 2z"/>
                        </svg>
                        <span>Pinterest Pins</span>
                      </a>
                    )}

                    {activeProject.instagramUrl && (
                      <a
                        href={activeProject.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-[13px] font-heading font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:scale-105"
                        data-cursor="Instagram Post"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="w-4.5 h-4.5">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        <span>Instagram Post</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* [09] High-Fidelity Editorial Gallery Carousel */}
              {activeProject.id !== 'tastico' && (() => {
                const slides = (activeProject.galleryImages && activeProject.galleryImages.length > 0)
                  ? activeProject.galleryImages
                  : [activeProject.image];

                return (
                  <div className="mb-16 select-none w-full">
                    <h3 className="text-[13px] font-heading font-semibold tracking-[0.15em] uppercase text-white/45 mb-6 text-center sm:text-left">
                      [09] HIGH-FIDELITY GALLERY EXHIBIT
                    </h3>
                    
                    <div className="w-full max-w-2xl mx-auto relative group/carousel">
                      
                      {/* Main slide display viewport */}
                      <div 
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd(slides.length)}
                        className="w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 relative shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                      >
                        
                        {/* Disco mirror tile grid overlay */}
                        <div className="disco-tile-grid opacity-10 pointer-events-none" />
                        
                        {/* Slides container */}
                        <div className="w-full h-full relative">
                          {slides.map((imgSrc, idx) => {
                            const isActive = idx === activeSlideIndex;
                            return (
                              <div
                                key={idx}
                                onClick={() => setLightboxImage(imgSrc)}
                                className={`absolute inset-0 w-full h-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                                  isActive 
                                    ? 'opacity-100 scale-100 z-10 pointer-events-auto' 
                                    : 'opacity-0 scale-[0.97] z-0 pointer-events-none'
                                }`}
                                data-cursor="Zoom Art"
                              >
                                <img
                                  src={imgSrc}
                                  alt={`${activeProject.title} Exhibit ${idx + 1}`}
                                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1000ms]"
                                  loading="lazy"
                                />
                              </div>
                            );
                          })}
                        </div>

                        {/* Glowing Specular bottom shading */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent pointer-events-none z-20" />
                      </div>

                      {/* Glassmorphic Left/Right Navigation controls (only if multi-slide) */}
                      {slides.length > 1 && (
                        <>
                          {/* Left button */}
                          <button
                            onClick={() => setActiveSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-white/10 hover:border-white/35 text-white/70 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-30 shadow-lg"
                            data-cursor="Prev Slide"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>

                          {/* Right button */}
                          <button
                            onClick={() => setActiveSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-white/10 hover:border-white/35 text-white/70 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-30 shadow-lg"
                            data-cursor="Next Slide"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        </>
                      )}

                      {/* Elegant Segmented Navigation indicator bars (Bottom) */}
                      {slides.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-black/40 backdrop-blur-sm border border-white/5 rounded-full px-3 py-2">
                          {slides.map((_, idx) => {
                            const isActive = idx === activeSlideIndex;
                            return (
                              <button
                                key={idx}
                                onClick={() => setActiveSlideIndex(idx)}
                                className={`h-[3px] rounded-full transition-all duration-500 ease-[var(--ease-luxury)] cursor-pointer ${
                                  isActive ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                              />
                            );
                          })}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })()}

              {/* [9] Next Project Spatial Gateway */}
              <div className="w-full border-t border-white/10 pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <span className="text-[11px] font-heading font-medium tracking-[0.15em] uppercase text-white/35 block mb-1">
                    UP NEXT EXPLICIT
                  </span>
                  <span className="text-[20px] sm:text-[24px] font-heading font-bold text-white leading-none">
                    Explore Next Speculative Concept
                  </span>
                </div>
                
                <button
                  onClick={handleNextProject}
                  className="inline-flex items-center gap-3 bg-white text-black font-heading font-semibold uppercase tracking-wider text-[12px] rounded-full px-6 py-3.5 hover:bg-black hover:text-white border border-white hover:border-white/20 transition-all duration-300 cursor-pointer select-none"
                  data-cursor="Next Gateway"
                  data-magnetic
                >
                  <span>Launch Gateway</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Lightbox / Full-Screen Image Preview Modal */}
      {lightboxImage && createPortal(
        <div
          className="fixed inset-0 z-[10100] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center select-none"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button Anchor */}
          <button
            onClick={() => setLightboxImage(null)}
            className="fixed top-6 right-6 sm:top-8 sm:right-10 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 z-[10200] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
            data-cursor="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Full uncropped poster layout */}
          <div 
            className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center animate-zoom-in"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            <img
              src={lightboxImage}
              alt="Full Poster View"
              className="max-w-full max-h-[76vh] sm:max-h-[78vh] object-contain rounded-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* Bottom Brand Watermark Signatures: PIXELCRAFT® BY SUJITH */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none z-10 text-center">
            <img
              src="/Pixelcraft Discomorphism wb.png"
              alt="PixelCraft Logo"
              className="w-10 h-10 object-contain filter drop-shadow-[0_0_10px_rgba(255,0,127,0.5)] drop-shadow-[0_0_5px_rgba(0,255,255,0.35)] transition-transform duration-700"
            />
            <span className="text-[12px] font-heading font-medium tracking-[0.25em] uppercase text-white/50">
              PixelCraft<span className="text-[8px] align-super leading-none text-white/40">®</span>
              <span className="font-cursive text-[18px] text-white/60 ml-1.5 normal-case">by Sujith</span>
            </span>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};
