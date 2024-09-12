<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SearchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('username', 'test')->first();
        for($i = 0; $i < 20; $i++) {
            Contact::create([
                'firstname' => "first".$i,
                'lastname' => 'last'.$i,
                'email' => 'mur'.$i.'gmail.com',
                'phone' => '12345'.$i,
                'user_id' => $user->id,
            ]);
        }
    }
}
