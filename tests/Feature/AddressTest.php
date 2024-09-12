<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Contact;
use Database\Seeders\AddressSeeder;
use Database\Seeders\ContactSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddressTest extends TestCase
{
   public function testCreateSuccess()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        
        $this->post('api/contacts/'.$contact->id.'/addresses', [
            'street' => 'street',
            'city' => 'city',
            'province' => 'province',
            'country' => 'country',
            'postal_code' => '1234',
        ],
        [
            'Authorization' => 'test'
        ]
        )->assertStatus(201)
         ->assertJson([
            'data' => [
                'street' => 'street',
                'city' => 'city',
                'province' => 'province',
                'country' => 'country',
                'postal_code' => '1234',
            ]
       ]);
   }

   public function testCreateFailed()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->post('api/contacts/'.$contact->id.'/addresses', [
            'street' => 'street',
            'city' => 'city',
            'province' => 'province',
            'country' => '',
            'postal_code' => '1234'
        ],[
            'Authorization' => 'test'
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [
                'country' => [
                    'The country field is required.'
                ]
            ]
       ]);
   }

   public function testCreateNotFound()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->post('api/contacts/'.($contact->id+1).'/addresses', [
            'street' => 'street',
            'city' => 'city',
            'province' => 'province',
            'country' => 'country',
            'postal_code' => '1234',
        ],[
            'Authorization' => 'test'
        ])->assertStatus(404)
          ->assertJson([
            'errors' => [
                'message' => [
                    'not found'
                ]
            ]
        ]);
   }

   public function testGetAddresses()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $address = Address::query()->limit(1)->first();

        $this->get('api/contacts/'.$address->contact_id.'/addresses/'.$address->id, [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => [
                'street' => 'street',
                'city' => 'city',
                'province' => 'province',
                'country' => 'country',
                'postal_code' => '1234'
            ]
        ]);
   }

   public function testGetNotFound()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $address = Address::query()->limit(1)->first();

        $this->get('api/contacts/'.$address->contact_id.'/addresses/'.($address->id + 1), [
            'Authorization' => 'test'
        ])->assertStatus(404)
          ->assertJson([
            'errors' => [
                'message' => [
                    'not found'
                ]
            ]
       ]);
   }

   public function testUpdateSuccess()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $address = Address::query()->limit(1)->first();

        $this->put('api/contacts/'.$address->contact_id.'/addresses/'.$address->id, [
            'street' => 'street update',
            'city' => 'city update',
            'province' => 'province update',
            'country' => 'country update',
            'postal_code' => '4321',
        ],[
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => [
                'street' => 'street update',
                'city' => 'city update',
                'province' => 'province update',
                'country' => 'country update',
                'postal_code' => '4321',
            ]
        ]);
   }

   public function testUpdateFailed()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $address = Address::query()->limit(1)->first();

        $this->put('api/contacts/'.$address->contact_id.'/addresses/'.$address->id, [
            'street' => 'street update',
            'city' => 'city update',
            'province' => 'province update',
            'country' => '',
            'postal_code' => '4321'
        ],[
            'Authorization' => 'test'
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [
                'country' => [
                    'The country field is required.'
                ]
            ]
        ]);
   }

   public function testUpdateNotFound()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $address = Address::query()->limit(1)->first();

        $this->put('api/contacts/'.$address->contact_id.'/addresses/'.($address->id + 1), [
            'street' => 'street update',
            'city' => 'city update',
            'province' => 'province update',
            'country' => 'country update',
            'postal_code' => '4321'
        ],[
            'Authorization' => 'test'
        ])->assertStatus(404)
          ->assertJson([
            'errors' => [
                'message' => [
                    'not found'
                ]
            ]
        ]);
   }

   public function testLogoutSuccess()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $address = Address::query()->limit(1)->first();

        $this->delete('api/contacts/'.$address->contact_id.'/addresses/'.$address->id, 
        [], [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => true
        ]);
   }

   public function testLogoutNotFound()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $address = Address::query()->limit(1)->first();

        $this->delete('api/contacts/'.$address->contact_id.'/addresses/'.($address->id + 1), 
        [], [
            'Authorization' => 'test'
        ])->assertStatus(404)
         ->assertJson([
            'errors' => [
                'message' => [
                    'not found'
                ]
            ]
        ]);
   }

   public function testGetListSuccess()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->get('api/contacts/'.$contact->id.'/addresses', 
        [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => [
                [
                    'street' => 'street',
                    'city' => 'city',
                    'province' => 'province',
                    'country' => 'country',
                    'postal_code' => '1234',
                ]
            ]
        ]);
   }

   public function testGetListNotFound()
   {
        $this->seed([UserSeeder::class, ContactSeeder::class, AddressSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->get('api/contacts/'.($contact->id + 1).'/addresses', [
            'Authorization' => 'test'
        ])->assertStatus(404)
          ->assertJson([
            'errors' => [
                'message' => [
                    'not found'
                ]
            ]
        ]);
   }
}
