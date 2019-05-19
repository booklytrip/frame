import React from 'react';

import { Select } from 'semantic-ui-react';

const nationalities = [
    { text: 'Afghan', value: 'Afghan' },
    { text: 'Albanian', value: 'Albanian' },
    { text: 'Algerian', value: 'Algerian' },
    { text: 'American', value: 'American' },
    { text: 'Andorran', value: 'Andorran' },
    { text: 'Angolan', value: 'Angolan' },
    { text: 'Antiguans', value: 'Antiguans' },
    { text: 'Argentinean', value: 'Argentinean' },
    { text: 'Armenian', value: 'Armenian' },
    { text: 'Australian', value: 'Australian' },
    { text: 'Austrian', value: 'Austrian' },
    { text: 'Azerbaijani', value: 'Azerbaijani' },
    { text: 'Bahamian', value: 'Bahamian' },
    { text: 'Bahraini', value: 'Bahraini' },
    { text: 'Bangladeshi', value: 'Bangladeshi' },
    { text: 'Barbadian', value: 'Barbadian' },
    { text: 'Barbudans', value: 'Barbudans' },
    { text: 'Batswana', value: 'Batswana' },
    { text: 'Belarusian', value: 'Belarusian' },
    { text: 'Belgian', value: 'Belgian' },
    { text: 'Belizean', value: 'Belizean' },
    { text: 'Beninese', value: 'Beninese' },
    { text: 'Bhutanese', value: 'Bhutanese' },
    { text: 'Bolivian', value: 'Bolivian' },
    { text: 'Bosnian', value: 'Bosnian' },
    { text: 'Brazilian', value: 'Brazilian' },
    { text: 'British', value: 'British' },
    { text: 'Bruneian', value: 'Bruneian' },
    { text: 'Bulgarian', value: 'Bulgarian' },
    { text: 'Burkinabe', value: 'Burkinabe' },
    { text: 'Burmese', value: 'Burmese' },
    { text: 'Burundian', value: 'Burundian' },
    { text: 'Cambodian', value: 'Cambodian' },
    { text: 'Cameroonian', value: 'Cameroonian' },
    { text: 'Canadian', value: 'Canadian' },
    { text: 'Cape Verdean', value: 'Cape Verdean' },
    { text: 'Central African', value: 'Central African' },
    { text: 'Chadian', value: 'Chadian' },
    { text: 'Chilean', value: 'Chilean' },
    { text: 'Chinese', value: 'Chinese' },
    { text: 'Colombian', value: 'Colombian' },
    { text: 'Comoran', value: 'Comoran' },
    { text: 'Congolese', value: 'Congolese' },
    { text: 'Congolese', value: 'Congolese' },
    { text: 'Costa Rican', value: 'Costa Rican' },
    { text: 'Croatian', value: 'Croatian' },
    { text: 'Cuban', value: 'Cuban' },
    { text: 'Cypriot', value: 'Cypriot' },
    { text: 'Czech', value: 'Czech' },
    { text: 'Danish', value: 'Danish' },
    { text: 'Djibouti', value: 'Djibouti' },
    { text: 'Dominican', value: 'Dominican' },
    { text: 'Dominican', value: 'Dominican' },
    { text: 'Dutch', value: 'Dutch' },
    { text: 'Dutchman', value: 'Dutchman' },
    { text: 'Dutchwoman', value: 'Dutchwoman' },
    { text: 'East Timorese', value: 'East Timorese' },
    { text: 'Ecuadorean', value: 'Ecuadorean' },
    { text: 'Egyptian', value: 'Egyptian' },
    { text: 'Emirian', value: 'Emirian' },
    { text: 'Equatorial Guinean', value: 'Equatorial Guinean' },
    { text: 'Eritrean', value: 'Eritrean' },
    { text: 'Estonian', value: 'Estonian' },
    { text: 'Ethiopian', value: 'Ethiopian' },
    { text: 'Fijian', value: 'Fijian' },
    { text: 'Filipino', value: 'Filipino' },
    { text: 'Finnish', value: 'Finnish' },
    { text: 'French', value: 'French' },
    { text: 'Gabonese', value: 'Gabonese' },
    { text: 'Gambian', value: 'Gambian' },
    { text: 'Georgian', value: 'Georgian' },
    { text: 'German', value: 'German' },
    { text: 'Ghanaian', value: 'Ghanaian' },
    { text: 'Greek', value: 'Greek' },
    { text: 'Grenadian', value: 'Grenadian' },
    { text: 'Guatemalan', value: 'Guatemalan' },
    { text: 'Guinea-Bissauan', value: 'Guinea-Bissauan' },
    { text: 'Guinean', value: 'Guinean' },
    { text: 'Guyanese', value: 'Guyanese' },
    { text: 'Haitian', value: 'Haitian' },
    { text: 'Herzegovinian', value: 'Herzegovinian' },
    { text: 'Honduran', value: 'Honduran' },
    { text: 'Hungarian', value: 'Hungarian' },
    { text: 'I-Kiribati', value: 'I-Kiribati' },
    { text: 'Icelander', value: 'Icelander' },
    { text: 'Indian', value: 'Indian' },
    { text: 'Indonesian', value: 'Indonesian' },
    { text: 'Iranian', value: 'Iranian' },
    { text: 'Iraqi', value: 'Iraqi' },
    { text: 'Irish', value: 'Irish' },
    { text: 'Irish', value: 'Irish' },
    { text: 'Israeli', value: 'Israeli' },
    { text: 'Italian', value: 'Italian' },
    { text: 'Ivorian', value: 'Ivorian' },
    { text: 'Jamaican', value: 'Jamaican' },
    { text: 'Japanese', value: 'Japanese' },
    { text: 'Jordanian', value: 'Jordanian' },
    { text: 'Kazakhstani', value: 'Kazakhstani' },
    { text: 'Kenyan', value: 'Kenyan' },
    { text: 'Kittian and Nevisian', value: 'Kittian and Nevisian' },
    { text: 'Kuwaiti', value: 'Kuwaiti' },
    { text: 'Kyrgyz', value: 'Kyrgyz' },
    { text: 'Laotian', value: 'Laotian' },
    { text: 'Latvian', value: 'Latvian' },
    { text: 'Lebanese', value: 'Lebanese' },
    { text: 'Liberian', value: 'Liberian' },
    { text: 'Libyan', value: 'Libyan' },
    { text: 'Liechtensteiner', value: 'Liechtensteiner' },
    { text: 'Lithuanian', value: 'Lithuanian' },
    { text: 'Luxembourger', value: 'Luxembourger' },
    { text: 'Macedonian', value: 'Macedonian' },
    { text: 'Malagasy', value: 'Malagasy' },
    { text: 'Malawian', value: 'Malawian' },
    { text: 'Malaysian', value: 'Malaysian' },
    { text: 'Maldivan', value: 'Maldivan' },
    { text: 'Malian', value: 'Malian' },
    { text: 'Maltese', value: 'Maltese' },
    { text: 'Marshallese', value: 'Marshallese' },
    { text: 'Mauritanian', value: 'Mauritanian' },
    { text: 'Mauritian', value: 'Mauritian' },
    { text: 'Mexican', value: 'Mexican' },
    { text: 'Micronesian', value: 'Micronesian' },
    { text: 'Moldovan', value: 'Moldovan' },
    { text: 'Monacan', value: 'Monacan' },
    { text: 'Mongolian', value: 'Mongolian' },
    { text: 'Moroccan', value: 'Moroccan' },
    { text: 'Mosotho', value: 'Mosotho' },
    { text: 'Motswana', value: 'Motswana' },
    { text: 'Mozambican', value: 'Mozambican' },
    { text: 'Namibian', value: 'Namibian' },
    { text: 'Nauruan', value: 'Nauruan' },
    { text: 'Nepalese', value: 'Nepalese' },
    { text: 'Netherlander', value: 'Netherlander' },
    { text: 'New Zealander', value: 'New Zealander' },
    { text: 'Ni-Vanuatu', value: 'Ni-Vanuatu' },
    { text: 'Nicaraguan', value: 'Nicaraguan' },
    { text: 'Nigerian', value: 'Nigerian' },
    { text: 'Nigerien', value: 'Nigerien' },
    { text: 'North Korean', value: 'North Korean' },
    { text: 'Northern Irish', value: 'Northern Irish' },
    { text: 'Norwegian', value: 'Norwegian' },
    { text: 'Omani', value: 'Omani' },
    { text: 'Pakistani', value: 'Pakistani' },
    { text: 'Palauan', value: 'Palauan' },
    { text: 'Panamanian', value: 'Panamanian' },
    { text: 'Papua New Guinean', value: 'Papua New Guinean' },
    { text: 'Paraguayan', value: 'Paraguayan' },
    { text: 'Peruvian', value: 'Peruvian' },
    { text: 'Polish', value: 'Polish' },
    { text: 'Portuguese', value: 'Portuguese' },
    { text: 'Qatari', value: 'Qatari' },
    { text: 'Romanian', value: 'Romanian' },
    { text: 'Russian', value: 'Russian' },
    { text: 'Rwandan', value: 'Rwandan' },
    { text: 'Saint Lucian', value: 'Saint Lucian' },
    { text: 'Salvadoran', value: 'Salvadoran' },
    { text: 'Samoan', value: 'Samoan' },
    { text: 'San Marinese', value: 'San Marinese' },
    { text: 'Sao Tomean', value: 'Sao Tomean' },
    { text: 'Saudi', value: 'Saudi' },
    { text: 'Scottish', value: 'Scottish' },
    { text: 'Senegalese', value: 'Senegalese' },
    { text: 'Serbian', value: 'Serbian' },
    { text: 'Seychellois', value: 'Seychellois' },
    { text: 'Sierra Leonean', value: 'Sierra Leonean' },
    { text: 'Singaporean', value: 'Singaporean' },
    { text: 'Slovakian', value: 'Slovakian' },
    { text: 'Slovenian', value: 'Slovenian' },
    { text: 'Solomon Islander', value: 'Solomon Islander' },
    { text: 'Somali', value: 'Somali' },
    { text: 'South African', value: 'South African' },
    { text: 'South Korean', value: 'South Korean' },
    { text: 'Spanish', value: 'Spanish' },
    { text: 'Sri Lankan', value: 'Sri Lankan' },
    { text: 'Sudanese', value: 'Sudanese' },
    { text: 'Surinamer', value: 'Surinamer' },
    { text: 'Swazi', value: 'Swazi' },
    { text: 'Swedish', value: 'Swedish' },
    { text: 'Swiss', value: 'Swiss' },
    { text: 'Syrian', value: 'Syrian' },
    { text: 'Taiwanese', value: 'Taiwanese' },
    { text: 'Tajik', value: 'Tajik' },
    { text: 'Tanzanian', value: 'Tanzanian' },
    { text: 'Thai', value: 'Thai' },
    { text: 'Togolese', value: 'Togolese' },
    { text: 'Tongan', value: 'Tongan' },
    { text: 'Trinidadian or Tobagonian', value: 'Trinidadian or Tobagonian' },
    { text: 'Tunisian', value: 'Tunisian' },
    { text: 'Turkish', value: 'Turkish' },
    { text: 'Tuvaluan', value: 'Tuvaluan' },
    { text: 'Ugandan', value: 'Ugandan' },
    { text: 'Ukrainian', value: 'Ukrainian' },
    { text: 'Uruguayan', value: 'Uruguayan' },
    { text: 'Uzbekistani', value: 'Uzbekistani' },
    { text: 'Venezuelan', value: 'Venezuelan' },
    { text: 'Vietnamese', value: 'Vietnamese' },
    { text: 'Welsh', value: 'Welsh' },
    { text: 'Welsh', value: 'Welsh' },
    { text: 'Yemenite', value: 'Yemenite' },
    { text: 'Zambian', value: 'Zambian' },
    { text: 'Zimbabwean', value: 'Zimbabwean' },
];

export default function({ ...props }) {
    return React.createElement(Select, {
        ...props,
        options: nationalities,
    });
}