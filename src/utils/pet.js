import dayjs from '@/adapters/day';

export const mapperPetPhoto = photo => {
  if (photo === null || photo === undefined) {
    return '/profile-default.svg';
  }
  return new URL(photo, 'https://petmeet.space').toString();
};

export const mapperPet = (pet, types, breeds) => {
  return {
    id: pet.id,
    name: pet.pet_name,
    description: pet.pet_description,
    sex: pet.is_male ? 'MALE' : 'FEMALE',
    birthDate: pet.birth_date,
    age: dayjs().from(dayjs(pet.birth_date), true),
    photo: mapperPetPhoto(pet.photo),
    type: types.find(item => item.id === pet.pet_type)?.type_name,
    typeId: pet.pet_type,
    breed: breeds.find(item => item.id === pet.breed)?.breed_name,
    breedId: pet.breed,
  };
};
