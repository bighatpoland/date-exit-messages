import { Template } from '../types'

// 15+ templates with placeholders {RELATION}, {NAME}, {DETAIL}
// Updated sender options: mom, dog, roommate, boss, plant sitter, etc.
const templates: Template[] = [
  {
    id: 'dog-sick',
    title: 'Dog sick',
    senderOptions: ['Mom', 'Roommate', 'Sister', 'Vet', 'Neighbor'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Hey, {RELATION}, Milo's thrown up a bit — can you come?",
        "{NAME}: Sorry to text — {RELATION}, just noticed Max limping a little.",
      ],
      medium: [
        "{NAME}: Please come now — {DETAIL}. Max won't stop yelping!",
        "{NAME}: {RELATION}, I need help — Max is bleeding near his paw.",
      ],
      nuclear: [
        "{NAME}: Emergency — {DETAIL}. I'm heading to the vet now, please meet me.",
        "{NAME}: I can't drive, Max collapsed and isn't breathing. Need you now.",
      ],
    },
  },
  {
    id: 'roommate-locked-out',
    title: 'Roommate locked out',
    senderOptions: ['Roommate', 'Flatmate', 'Friend', 'Neighbor'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Ugh I forgot my keys, can you pop home for 5?",
        "{NAME}: Hey, I'm outside — door won't open. Can you help?",
      ],
      medium: [
        "{NAME}: Got locked out and my phone's dying — can you buzz me in?",
        "{NAME}: {DETAIL} happened and I'm stuck outside, please help.",
      ],
      nuclear: [
        "{NAME}: I left my kid inside and locked myself out — urgent! Need help.",
        "{NAME}: There's a leak/poisoning concern — home urgently, please.",
      ],
    },
  },
  {
    id: 'plumber-disaster',
    title: 'Plumber disaster',
    senderOptions: ['Landlord', 'Neighbor', 'Friend', 'Concierge'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Plumber running late, water's dripping — can you hold off?",
        "{NAME}: Small leak in kitchen, just dealing with it quickly.",
      ],
      medium: [
        "{NAME}: Plumber found major burst, need to be home to let them in.",
        "{NAME}: Water everywhere — calling someone to help stop it.",
      ],
      nuclear: [
        "{NAME}: Massive leak flooding the flat. Must go now, sorry.",
        "{NAME}: {DETAIL} — we need to evacuate, please come asap.",
      ],
    },
  },
  {
    id: 'work-call',
    title: 'Urgent work call',
    senderOptions: ['Boss', 'Manager', 'HR', 'Colleague'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Quick call about today's meeting, can you call me back?",
        "{NAME}: Need to shift plans for tomorrow, small thing.",
      ],
      medium: [
        "{NAME}: Emergency with a client — please handle a quick call now.",
        "{NAME}: {DETAIL} came up, join a call in 5 minutes.",
      ],
      nuclear: [
        "{NAME}: Major outage — everyone's being pulled in. Can't stay out.",
        "{NAME}: This is urgent: legal/reputation issue, get here now.",
      ],
    },
  },
  {
    id: 'family-illness',
    title: 'Family illness',
    senderOptions: ['Mom', 'Dad', 'Sister', 'Brother', 'Grandma'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Your aunt's feeling faint — can you come by later?",
        "{NAME}: Family ask: can you check on Gran after work?",
      ],
      medium: [
        "{NAME}: {RELATION} fainted, I need to go to the hospital with them.",
        "{NAME}: Urgent family thing — can't stay, must leave.",
      ],
      nuclear: [
        "{NAME}: {DETAIL} — critical condition. Need you at the hospital now.",
        "{NAME}: They're asking us to come immediately, please leave now.",
      ],
    },
  },
  {
    id: 'car-breakdown',
    title: 'Car breakdown',
    senderOptions: ['Friend', 'Mechanic', 'Partner', 'Tow Service'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Car won't start, might be battery — I'll sort it.",
        "{NAME}: Stuck but safe, need to grab a tow later.",
      ],
      medium: [
        "{NAME}: Stalled on the side of the road, waiting for recovery.",
        "{NAME}: {DETAIL} and I can't drive it home.",
      ],
      nuclear: [
        "{NAME}: Breakdown in bad area — need you to come pick me up now.",
        "{NAME}: Accident involved, calling for assistance. Sorry, must go.",
      ],
    },
  },
  {
    id: 'childcare-emergency',
    title: 'Childcare emergency',
    senderOptions: ['Babysitter', 'Partner', 'Friend', 'School'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Babysitter's schedule changed — need a hand soon.",
        "{NAME}: Kid's upset, nothing serious but need to leave early.",
      ],
      medium: [
        "{NAME}: Fever spiking at home — must go now.",
        "{NAME}: {RELATION} needs immediate attention, sorry.",
      ],
      nuclear: [
        "{NAME}: Emergency at home with the child, hospital on the way.",
        "{NAME}: Serious allergic reaction — need to get to A&E now.",
      ],
    },
  },
  {
    id: 'neighbor-fire',
    title: 'Neighbor fire/smoke',
    senderOptions: ['Neighbor', 'Concierge', 'Friend', 'Fire Dept'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Smell of smoke in the hallway, being checked out.",
        "{NAME}: Fire alarm went off, probably false — checking.",
      ],
      medium: [
        "{NAME}: There's smoke in the building — we need to evacuate.",
        "{NAME}: {DETAIL}, leaving now to help neighbours.",
      ],
      nuclear: [
        "{NAME}: Fire in the building — emergency services called. Must go.",
        "{NAME}: Evacuating now, can't stay. I'm safe but leaving.",
      ],
    },
  },
  {
    id: 'pet-sitter',
    title: 'Pet sitter urgent',
    senderOptions: ['Pet sitter', 'Neighbor', 'Friend', 'Vet'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Your sitter needs more time — feeding routine issue.",
        "{NAME}: Just a quick change, sorry to ask.",
      ],
      medium: [
        "{NAME}: Pet is unwell and needs to go to the vet.",
        "{NAME}: {DETAIL} — must take them in now.",
      ],
      nuclear: [
        "{NAME}: Emergency with your pet, transport to clinic now.",
        "{NAME}: Critical issue, call when you can. I'm heading to the vet.",
      ],
    },
  },
  {
    id: 'delivery-accident',
    title: 'Delivery accident',
    senderOptions: ['Delivery', 'Neighbor', 'Shop', 'Courier'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Package delayed, my apologies — need a minute.",
        "{NAME}: Delivery mix-up, sorting it out now.",
      ],
      medium: [
        "{NAME}: Driver collision but minor, need to sort paperwork.",
        "{NAME}: {DETAIL}, dealing with insurance call.",
      ],
      nuclear: [
        "{NAME}: Car crash with injuries — must go to help.",
        "{NAME}: Major incident at delivery, can't stay.",
      ],
    },
  },
  {
    id: 'medical-appointment',
    title: 'Medical appointment',
    senderOptions: ['Clinic', 'Doctor', 'Nurse', 'Hospital'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Running late for appointment — may need to leave early.",
        "{NAME}: Quick check-up results, nothing urgent but must go.",
      ],
      medium: [
        "{NAME}: Doctor needs to see me now — urgent follow-up.",
        "{NAME}: {DETAIL}, can't be delayed.",
      ],
      nuclear: [
        "{NAME}: Emergency treatment required immediately. Sorry, leave now.",
        "{NAME}: Hospital asked me to come in urgently; can't stay.",
      ],
    },
  },
  {
    id: 'safety-concern',
    title: 'Safety concern',
    senderOptions: ['Friend', 'Neighbor', 'Security', 'Police'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Not feeling great about the area, stepping out for a bit.",
        "{NAME}: Taking a walk — nothing serious.",
      ],
      medium: [
        "{NAME}: Someone's acting suspicious nearby, moving to safety.",
        "{NAME}: {DETAIL} — need to step away now.",
      ],
      nuclear: [
        "{NAME}: Confrontation happening, I need to leave and call for help.",
        "{NAME}: Unsafe situation — leaving immediately.",
      ],
    },
  },
  {
    id: 'apartment-issue',
    title: 'Apartment issue',
    senderOptions: ['Landlord', 'Neighbor', 'Concierge', 'Maintenance'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Small maintenance issue, sorting it out now.",
        "{NAME}: Quick fix required at home, heading there soon.",
      ],
      medium: [
        "{NAME}: Water/heat problem needs immediate access — need to go.",
        "{NAME}: {DETAIL}, must handle it now.",
      ],
      nuclear: [
        "{NAME}: Gas leak/safety hazard — must evacuate now.",
        "{NAME}: Building emergency, leaving immediately.",
      ],
    },
  },
  {
    id: 'family-trust',
    title: 'Family trust call',
    senderOptions: ['Sibling', 'Parent', 'Relative', 'Lawyer'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Family check-in, nothing serious but need to step out.",
        "{NAME}: Small family logistics — back soon.",
      ],
      medium: [
        "{NAME}: Family member needs help immediately, leaving now.",
        "{NAME}: {DETAIL} — must go.",
      ],
      nuclear: [
        "{NAME}: Serious family emergency, gotta go to them now.",
        "{NAME}: Hospital called — need to be there right away.",
      ],
    },
  },
  {
    id: 'plant-sitter',
    title: 'Plant sitter urgent',
    senderOptions: ['Plant sitter', 'Neighbor', 'Friend', 'Gardener'],
    messagesBySeverity: {
      mild: [
        "{NAME}: Your plants need watering — can you handle?",
        "{NAME}: Quick plant check, sorry to bother.",
      ],
      medium: [
        "{NAME}: One of your plants is wilting badly, need advice.",
        "{NAME}: {DETAIL} with the plants — must check now.",
      ],
      nuclear: [
        "{NAME}: Plant emergency — pests or disease spreading.",
        "{NAME}: All plants dying, need immediate intervention.",
      ],
    },
  }
]

export default templates
