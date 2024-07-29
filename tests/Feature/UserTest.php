<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function testRegister()
    {
        $this->post('api/users/', [
            'username' => 'mursidin',
            'password' => 'rahasia',
            'name' => 'mursidin boy'
        ])->assertStatus(201)
          ->assertJson([
            'data' => [
                'username' => 'mursidin',
                'name' => 'mursidin boy',
            ]
          ]);
    }

    public function testRegisterFailed()
    {
        $this->post('api/users', [
            'username' => '',
            'password' => '',
            'name' => '',
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [
                'username' => [
                    'The username field is required.'
                ],
                'password' => [
                    'The password field is required.'
                ],
                'name' => [
                    'The name field is required.'
                ],
            ]
          ]);
    }

    public function testUserAlready()
    {
        $this->testRegister();
        $this->post('api/users/', [
            'username' => 'mursidin',
            'password' => 'rahasia',
            'name' => 'mursidin boy'
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [
                'username' => [
                    'username already registered'
                ],
            ]
          ]);
    }
}
