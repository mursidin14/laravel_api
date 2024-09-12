<?php

namespace Tests\Feature;

use App\Models\Contact;
use Database\Seeders\ContactSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ContactTest extends TestCase
{
    public function testCreateContactSuccess()
    {
        $this->seed([UserSeeder::class]);
        $this->post('/api/contacts', [
            'firstname' => 'refa',
            'lastname' => 'amirul',
            'email' => 'refa@gamil.com',
            'phone' => '081952215980'
        ],[
            'Authorization' => 'test'
        ])->assertStatus(201)
          ->assertJson([
            'data' => [
                'firstname' => 'refa',
                'lastname' => 'amirul',
                'email' => 'refa@gamil.com',
                'phone' => '081952215980'
            ]
          ]);
    }

    public function testCreateContactFiled()
    {
        $this->seed([UserSeeder::class]);
        $this->post('/api/contacts', [
            'firstname' => '',
            'lastname' => 'amirul',
            'email' => 'refa@gamil.com',
            'phone' => '081952215980'
        ],[
            'Authorization' => 'test'
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [
                'firstname' => [
                    "The firstname field is required."
                ]
            ]
          ]);
    }

    public function testContactUnauthorized()
    {
        $this->seed([UserSeeder::class]);
        $this->post('/api/contacts', [
            'firstname' => 'refa',
            'lastname' => 'amirul',
            'email' => 'refa@gamil.com',
            'phone' => '081952215980'
        ],[
            'Authorization' => ''
        ])->assertStatus(401)
          ->assertJson([
            'errors' => [
                'message' => [
                    "unauthorization"
                ]
            ]
          ]);
    }

    public function testGetContactSuccess()
    {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->get('/api/contacts/'.$contact->id, [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => [
                'firstname' => 'test',
                'lastname' => 'test',
                'email' => 'test@gmail.com',
                'phone' => '12345'
            ]
          ]);
    }

    public function testGetContactNotFound()
    {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();
        $this->get('api/contacts/'.($contact->id+1), [
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

    public function testOutherContact()
    {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->get('api/contacts/'.$contact->id, [
            'Authorization' => 'test2'
        ])->assertStatus(404)
          ->assertJson([
            'errors' => [
                'message' => [
                    'not found'
                ]
            ]
          ]);
    }
    

    public function testUpdateContact()
    {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->put('/api/contacts/'.$contact->id, [
                'firstname' => 'test3',
                'lastname' => 'test3',
                'email' => 'test3@gmail.com',
                'phone' => '12345'
        ], [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => [
                'firstname' => 'test3',
                'lastname' => 'test3',
                'email' => 'test3@gmail.com',
                'phone' => '12345'
            ]
          ]);
    }

    public function testFiledUpdate()
    {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->put('/api/contacts/'.$contact->id, [
                'firstname' => '',
                'lastname' => 'test3',
                'email' => 'test3@gmail.com',
                'phone' => '12345'
        ], [
            'Authorization' => 'test'
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [
                'firstname' => [
                    "The firstname field is required."
                ]
            ]
          ]);
    }

    public function testContactDeleteSuccess()
    {
        $this->seed([UserSeeder::class, ContactSeeder::class]);
        $contact = Contact::query()->limit(1)->first();

        $this->delete('/api/contacts/'.$contact->id, [], [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => true
          ]);
    }

}
