<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
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

    public function testGetUser()
    {
        $this->seed([UserSeeder::class]);
        $this->get('api/users/current', [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
            'data' => [
                'username' => 'test',
                'name' => 'test'
            ]
          ]);
    }

    public function testGetUnauthorization()
    {
        $this->seed([UserSeeder::class]);
        $this->get('api/users/current', [
        ])->assertStatus(401)
          ->assertJson([
            'errors' => [
                'message' => [
                    'unauthorization'
                ]
            ]
          ]);
    }

    public function testWrongToken()
    {
        $this->seed([UserSeeder::class]);
        $this->get('api/users/current', [
            'Authorization' => 'salah'
        ])->assertStatus(401)
          ->assertJson([
            'errors' => [
                'message' => [
                    'unauthorization'
                ]
            ]
          ]);
    }

    public function testPasswordSuccess()
    {
        $this->seed([UserSeeder::class]);
        $oldUser = User::query()->where('username', 'test')->first();

        $this->patch('api/users/current', [
            'password' => 'baru'
        ],
        [
            'Authorization' => 'test'
        ]
    )->assertStatus(200)
     ->assertJson([
        'data' => [
            'username' => 'test',
            'name' => 'test'
        ]
     ]);

     $newUser = User::query()->where('username', 'test')->first();
     self::assertNotEquals($oldUser->password, $newUser->password);
    }

    public function testNameUpdateSuccess()
    {
        $this->seed([UserSeeder::class]);
        $oldUser = User::query()->where('username', 'test')->first();

        $this->patch('api/users/current', [
            'name' => 'mure'
        ],
        [
            'Authorization' => 'test'
        ]
    )->assertStatus(200)
     ->assertJson([
        'data' => [
            'username' => 'test',
            'name' => 'mure'
        ]
     ]);

     $newUser = User::query()->where('username', 'test')->first();
     self::assertNotEquals($oldUser->name, $newUser->name);
    }

    public function testUpdateFailed() 
    {
        $this->seed([UserSeeder::class]);

        $this->patch('api/users/current', [
            'name' => 'Dengan langkah-langkah ini, Anda akan memiliki file .env yang siap digunakan untuk konfigurasi proyek Laravel Anda. File .env ini sangat penting untuk menyimpan pengaturan konfigurasi yang sensitif dan spesifik lingkungan, seperti informasi koneksi database, kunci aplikasi, dan lainnya.'
        ],
        [
            'Authorization' => 'test'
        ]
    )->assertStatus(400)
     ->assertJson([
        'errors' => [
            'name' => [
                "The name field must not be greater than 100 characters."
            ]
        ]
     ]);
    }

    public function testLogoutSuccess()
    {
        $this->seed([UserSeeder::class]);

        $this->delete( uri: '/api/users/logout', headers: [
            'Authorization' => 'test'
        ])->assertStatus(200)
          ->assertJson([
                'data' => true
          ]);

          $user = User::query()->where('username', 'test')->first();
          self::assertNull($user->token);
    }

    public function testLogoutFiled()
    {
        $this->seed([UserSeeder::class]);

        $this->delete( uri: '/api/users/logout', headers: [
            'Authorization' => 'salah'
        ])->assertStatus(401)
          ->assertJson([
                'errors' => [
                    'message' => [
                        'unauthorization'
                    ]
                ]
          ]);

    }
}
