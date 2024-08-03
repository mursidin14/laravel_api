<?php

namespace Tests\Feature;

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
}
