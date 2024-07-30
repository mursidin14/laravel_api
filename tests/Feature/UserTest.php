<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\UserSeeder;
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

    public function testLoginSuccess()
    {
        $this->seed([UserSeeder::class]);
        $this->post('api/users/login/', [
            'username' => 'test',
            'password' => 'test',
        ])->assertStatus(200)
          ->assertJson([
            'data' => [
                'username' => 'test',
                'name' => 'test',
            ]
          ]);

          $user = User::query()->where('username', 'test')->first();
          self::assertNotNull($user->token);
    }

    public function testLoginFiled()
    {
        $this->post('api/users/login', [
            'username' => 'test',
            'password' => 'test'
        ])->assertStatus(401)
          ->assertJson([
            'errors' => [
                'message' => [
                    'username or password wrong'
                ]
            ]
          ]);
    }

    public function testLoginPasswordFiled()
    {
        $this->seed([UserSeeder::class]);
        $this->post('api/users/login', [
            'username' => 'test',
            'password' => 'salah'
        ])->assertStatus(401)
          ->assertJson([
            'errors' => [
                'message' => [
                    'username or password wrong'
                ]
            ]
          ]);
    }
}
