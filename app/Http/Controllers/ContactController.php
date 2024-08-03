<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactCreateRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function create(ContactCreateRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = Auth::user();

        $contact = new Contact($data);
        $contact->user_id = $user->id;
        $contact->save();

        return (new ContactResource($contact))->response()->setStatusCode(201);
    }

    public function getContact(int $id): ContactResource
    {
        $user = Auth::user();

        $contact = Contact::query()->where('id', $id)->first();
        if(!$contact) {
            throw new HttpResponseException(response([
                'errors' => [
                    'message' => [
                    'not found'
                    ]
                ]
                ], 404));
        }

        return new ContactResource($contact);
    }
}
