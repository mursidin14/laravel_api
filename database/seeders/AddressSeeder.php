<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Contact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contact = Contact::query()->limit(1)->first();
        Address::create([
            'street' => 'street',
            'city' => 'city',
            'province' => 'province',
            'country' => 'country',
            'postal_code' => '1234',
            'contact_id' => $contact->id,
        ]);
    }
}
